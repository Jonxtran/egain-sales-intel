
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
    '208.67.222.222': 'OpenDNS/Cisco',
    '151.101.193.140': 'Fastly CDN',
    '104.16.132.229': 'Cloudflare',
    '173.252.74.22': 'Meta/Facebook',
    '142.250.80.14': 'Google LLC'
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

    // Load comprehensive sample visitor data focused on page-level analytics
    console.log('Loading page-level visitor analytics...');
    
    const sampleVisitorData = [
      {
        id: '1',
        ip: '69.191.211.207',
        timestamp: '2024-01-15T10:30:00Z',
        page: '/products/knowledge-management',
        referrer: 'google.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        sessionId: 'sess_123',
        duration: 245,
        location: 'Seattle, WA'
      },
      {
        id: '2',
        ip: '180.179.180.41',
        timestamp: '2024-01-15T11:15:00Z',
        page: '/solutions/customer-service',
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
        page: '/pricing/enterprise',
        referrer: 'direct',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        sessionId: 'sess_789',
        duration: 145,
        location: 'Austin, TX'
      },
      {
        id: '4',
        ip: '80.246.241.14',
        timestamp: '2024-01-15T12:30:00Z',
        page: '/demo/virtual-assistant',
        referrer: 'google.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        sessionId: 'sess_101',
        duration: 410,
        location: 'Frankfurt, Germany'
      },
      {
        id: '5',
        ip: '162.249.164.251',
        timestamp: '2024-01-15T13:45:00Z',
        page: '/solutions/ai-chatbots',
        referrer: 'twitter.com',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        sessionId: 'sess_202',
        duration: 285,
        location: 'New York, NY'
      },
      {
        id: '6',
        ip: '208.67.222.222',
        timestamp: '2024-01-15T14:20:00Z',
        page: '/resources/case-studies',
        referrer: 'google.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        sessionId: 'sess_303',
        duration: 190,
        location: 'San Jose, CA'
      },
      {
        id: '7',
        ip: '69.191.211.207',
        timestamp: '2024-01-15T14:50:00Z',
        page: '/products/contact-center',
        referrer: 'direct',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        sessionId: 'sess_123',
        duration: 155,
        location: 'Seattle, WA'
      },
      {
        id: '8',
        ip: '151.101.193.140',
        timestamp: '2024-01-15T15:10:00Z',
        page: '/about/company',
        referrer: 'linkedin.com',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        sessionId: 'sess_404',
        duration: 95,
        location: 'Boston, MA'
      },
      {
        id: '9',
        ip: '104.16.132.229',
        timestamp: '2024-01-15T15:35:00Z',
        page: '/integrations/salesforce',
        referrer: 'google.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        sessionId: 'sess_505',
        duration: 275,
        location: 'Chicago, IL'
      },
      {
        id: '10',
        ip: '173.252.74.22',
        timestamp: '2024-01-15T16:00:00Z',
        page: '/demo/live-chat',
        referrer: 'facebook.com',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
        sessionId: 'sess_606',
        duration: 340,
        location: 'Menlo Park, CA'
      }
    ];

    // Enhance data with company information and engagement metrics
    const enhancedData = sampleVisitorData.map(visitor => ({
      ...visitor,
      company: getCompanyFromIP(visitor.ip),
      engagement: calculateEngagement(1, visitor.duration)
    }));

    // Prepare detailed page-level analytics for ChatGPT
    const pageAnalytics = {
      totalVisitors: enhancedData.length,
      uniqueIPs: new Set(enhancedData.map(v => v.ip)).size,
      uniqueCompanies: new Set(enhancedData.map(v => getCompanyFromIP(v.ip))).size,
      recentVisits: enhancedData.slice(-5),
      topPages: getTopPages(enhancedData),
      topCompanies: getTopCompanies(enhancedData),
      engagementByPage: getEngagementByPage(enhancedData),
      averageSessionTime: getAverageSessionTime(enhancedData),
      pageCategories: getPageCategories(enhancedData)
    };

    const systemPrompt = `You are an AI assistant specialized in analyzing website visitor behavior and page-level analytics for eGain's website. You focus on providing insights about which specific pages visitors are viewing, how long they spend on each page, and what this indicates about their interests and intent.

Current Page Analytics Summary:
- Total page visits: ${pageAnalytics.totalVisitors}
- Unique visitors: ${pageAnalytics.uniqueIPs}
- Unique companies: ${pageAnalytics.uniqueCompanies}
- Average session time: ${pageAnalytics.averageSessionTime}s

Top Pages by Visits:
${pageAnalytics.topPages.map(p => `- ${p.page}: ${p.count} visits (avg ${p.avgDuration}s)`).join('\n')}

Page Categories Performance:
${pageAnalytics.pageCategories.map(c => `- ${c.category}: ${c.count} visits`).join('\n')}

High Engagement Pages:
${pageAnalytics.engagementByPage.filter(p => p.avgEngagement === 'High').map(p => `- ${p.page}: ${p.avgDuration}s avg time`).join('\n')}

Company Activity:
${pageAnalytics.topCompanies.map(c => `- ${c.company}: ${c.count} page visits`).join('\n')}

Recent Page Visits:
${pageAnalytics.recentVisits.map(v => `- ${v.company} visited ${v.page} for ${v.duration}s from ${v.location}`).join('\n')}

When analyzing this data, focus on:
1. Which specific pages are getting the most attention
2. Page engagement patterns and what they indicate about visitor intent
3. Company behavior patterns across different page types
4. Recommendations for content optimization based on page performance
5. Identification of high-intent visitors based on pages visited
6. Page-level conversion opportunities

Continue the conversation naturally, building upon previous context when relevant. Provide specific, actionable insights about page performance and visitor behavior.`;

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
      dataContext: pageAnalytics 
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

function getTopPages(visitors: any[]) {
  const pageCounts = visitors.reduce((acc, visitor) => {
    const page = visitor.page || 'Unknown';
    if (!acc[page]) {
      acc[page] = { count: 0, totalDuration: 0 };
    }
    acc[page].count += 1;
    acc[page].totalDuration += visitor.duration || 0;
    return acc;
  }, {});

  return Object.entries(pageCounts)
    .map(([page, data]: [string, any]) => ({ 
      page, 
      count: data.count,
      avgDuration: Math.round(data.totalDuration / data.count)
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

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

function getEngagementByPage(visitors: any[]) {
  const pageEngagement = visitors.reduce((acc, visitor) => {
    const page = visitor.page || 'Unknown';
    if (!acc[page]) {
      acc[page] = { durations: [], count: 0 };
    }
    acc[page].durations.push(visitor.duration || 0);
    acc[page].count += 1;
    return acc;
  }, {});

  return Object.entries(pageEngagement)
    .map(([page, data]: [string, any]) => {
      const avgDuration = data.durations.reduce((sum: number, d: number) => sum + d, 0) / data.count;
      return {
        page,
        avgDuration: Math.round(avgDuration),
        avgEngagement: calculateEngagement(1, avgDuration)
      };
    })
    .sort((a, b) => b.avgDuration - a.avgDuration);
}

function getAverageSessionTime(visitors: any[]) {
  const totalDuration = visitors.reduce((sum, visitor) => sum + (visitor.duration || 0), 0);
  return Math.round(totalDuration / visitors.length);
}

function getPageCategories(visitors: any[]) {
  const categories = visitors.reduce((acc, visitor) => {
    const page = visitor.page || '';
    let category = 'Other';
    
    if (page.includes('/products')) category = 'Products';
    else if (page.includes('/solutions')) category = 'Solutions';
    else if (page.includes('/demo')) category = 'Demos';
    else if (page.includes('/pricing')) category = 'Pricing';
    else if (page.includes('/resources')) category = 'Resources';
    else if (page.includes('/integrations')) category = 'Integrations';
    else if (page.includes('/about')) category = 'About';
    
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(categories)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}
