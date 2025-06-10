
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

// Move utility functions directly into the edge function
const getCompanyFromIP = (ip: string): string => {
  const companyMap: { [key: string]: string } = {
    '69.191.211.207': 'Microsoft Corporation',
    '180.179.180.41': 'Salesforce Inc',
    '3.141.5.27': 'Amazon Web Services',
    '80.246.241.14': 'Deutsche Bank AG',
    '162.249.164.251': 'JPMorgan Chase',
  };
  
  return companyMap[ip] || 'Unknown Company';
};

const calculateEngagement = (pages: number, duration: number): 'High' | 'Medium' | 'Low' => {
  if (pages >= 10 || duration >= 300) return 'High';
  if (pages >= 5 || duration >= 120) return 'Medium';
  return 'Low';
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();

    // Load sample visitor data that represents what would come from the Excel file
    console.log('Loading visitor data...');
    
    const sampleVisitorData = [
      {
        id: '1',
        ip: '69.191.211.207',
        timestamp: '2024-01-15T10:30:00Z',
        page: '/products',
        referrer: 'google.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        sessionId: 'sess_123',
        duration: 180,
        location: 'Seattle, WA'
      },
      {
        id: '2',
        ip: '180.179.180.41',
        timestamp: '2024-01-15T11:15:00Z',
        page: '/pricing',
        referrer: 'linkedin.com',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        sessionId: 'sess_456',
        duration: 320,
        location: 'San Francisco, CA'
      },
      {
        id: '3',
        ip: '3.141.5.27',
        timestamp: '2024-01-15T12:00:00Z',
        page: '/contact',
        referrer: 'direct',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        sessionId: 'sess_789',
        duration: 145,
        location: 'Austin, TX'
      }
    ];

    // Enhance data with company information
    const enhancedData = sampleVisitorData.map(visitor => ({
      ...visitor,
      company: getCompanyFromIP(visitor.ip),
      engagement: calculateEngagement(1, visitor.duration)
    }));

    // Prepare context data for ChatGPT
    const visitorSummary = {
      totalVisitors: enhancedData.length,
      uniqueIPs: new Set(enhancedData.map(v => v.ip)).size,
      recentVisits: enhancedData.slice(0, 10),
      topCompanies: getTopCompanies(enhancedData),
      topPages: getTopPages(enhancedData),
      engagementLevels: getEngagementLevels(enhancedData)
    };

    const systemPrompt = `You are an AI assistant specialized in analyzing website visitor data and providing business insights. You have access to visitor analytics data including IP addresses, companies, timestamps, page URLs, user agents, and engagement metrics.

Available data context:
- Total visitors in dataset: ${visitorSummary.totalVisitors}
- Unique IP addresses: ${visitorSummary.uniqueIPs}
- Top companies: ${visitorSummary.topCompanies.map(c => `${c.company} (${c.count} visits)`).join(', ')}
- Top pages: ${visitorSummary.topPages.map(p => `${p.page} (${p.count} views)`).join(', ')}
- Engagement levels: ${visitorSummary.engagementLevels.map(e => `${e.level}: ${e.count}`).join(', ')}

Recent visits data:
${visitorSummary.recentVisits.map(v => `- ${v.company} from ${v.location} visited ${v.page} for ${v.duration}s`).join('\n')}

When analyzing data or answering questions:
1. Focus on actionable business insights
2. Identify patterns in visitor behavior
3. Suggest optimization opportunities
4. Highlight potential leads or high-value visitors
5. Provide specific recommendations based on the data
6. Continue the conversation naturally, referencing previous context when relevant

Be conversational and build upon previous responses in our discussion.`;

    // Build conversation history for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
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

function getTopCompanies(visitors: any[]) {
  const companyCounts = visitors.reduce((acc, visitor) => {
    const company = visitor.company || 'Unknown';
    acc[company] = (acc[company] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(companyCounts)
    .map(([company, count]) => ({ company, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getTopPages(visitors: any[]) {
  const pageCounts = visitors.reduce((acc, visitor) => {
    const page = visitor.page || 'Unknown';
    acc[page] = (acc[page] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(pageCounts)
    .map(([page, count]) => ({ page, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getEngagementLevels(visitors: any[]) {
  const engagementCounts = visitors.reduce((acc, visitor) => {
    const engagement = visitor.engagement || 'Low';
    acc[engagement] = (acc[engagement] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(engagementCounts)
    .map(([level, count]) => ({ level, count }))
    .sort((a, b) => b.count - a.count);
}
