
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context } = await req.json();

    // Fetch recent visitor data from Supabase
    const { data: visitors, error } = await supabase
      .from('visitors')
      .select('*')
      .order('date_time_utc', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching visitors:', error);
    }

    // Prepare context data for ChatGPT
    const visitorSummary = visitors ? {
      totalVisitors: visitors.length,
      uniqueIPs: new Set(visitors.map(v => v.visitor_ip)).size,
      recentVisits: visitors.slice(0, 10),
      topDomains: getTopDomains(visitors),
      requestTypes: getRequestTypes(visitors)
    } : null;

    const systemPrompt = `You are an AI assistant specialized in analyzing website visitor data and providing business insights. You have access to visitor analytics data including IP addresses, domains, timestamps, page URLs, and user agents.

Available data context:
${visitorSummary ? `
- Total visitors in dataset: ${visitorSummary.totalVisitors}
- Unique IP addresses: ${visitorSummary.uniqueIPs}
- Top domains: ${visitorSummary.topDomains.map(d => `${d.domain} (${d.count} visits)`).join(', ')}
- Request types: ${visitorSummary.requestTypes.map(r => `${r.type} (${r.count})`).join(', ')}
` : 'No visitor data available'}

When analyzing data or answering questions:
1. Focus on actionable business insights
2. Identify patterns in visitor behavior
3. Suggest optimization opportunities
4. Highlight potential leads or high-value visitors
5. Provide specific recommendations based on the data

Be concise but insightful in your responses.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    const aiResponse = await response.json();
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${aiResponse.error?.message || 'Unknown error'}`);
    }

    const insight = aiResponse.choices[0].message.content;

    return new Response(JSON.stringify({ 
      insight,
      dataContext: visitorSummary 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-insights function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate insights',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getTopDomains(visitors: any[]) {
  const domainCounts = visitors.reduce((acc, visitor) => {
    const domain = visitor.domain || 'Unknown';
    acc[domain] = (acc[domain] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(domainCounts)
    .map(([domain, count]) => ({ domain, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getRequestTypes(visitors: any[]) {
  const typeCounts = visitors.reduce((acc, visitor) => {
    const type = visitor.request_type || 'Unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(typeCounts)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
}
