
import { useState } from 'react';
import { Search, MessageCircle, Sparkles, Send, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface IntelligentSearchProps {
  onSearch: (term: string) => void;
  searchTerm: string;
}

const IntelligentSearch = ({ onSearch, searchTerm }: IntelligentSearchProps) => {
  const [chatMode, setChatMode] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState('');
  const { toast } = useToast();

  const handleChatSubmit = async () => {
    if (!chatMessage.trim()) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('chat-insights', {
        body: { 
          message: chatMessage,
          context: 'visitor_analytics'
        }
      });

      if (error) throw error;

      setAiInsight(data.insight);
      setChatMessage('');
      
      toast({
        title: "AI Insight Generated",
        description: "ChatGPT has analyzed your visitor data",
      });
    } catch (error) {
      console.error('Error getting AI insight:', error);
      toast({
        title: "Error",
        description: "Failed to get AI insights. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "What patterns do you see in recent visitor behavior?",
    "Which companies show the highest engagement?",
    "What are the most popular pages being visited?",
    "Are there any potential high-value leads I should focus on?",
    "What optimization opportunities do you recommend?"
  ];

  return (
    <div className="space-y-4">
      {/* Search/Chat Mode Toggle */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          {!chatMode ? (
            <>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by company, IP, page type, or visitor behavior..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10 h-11"
              />
            </>
          ) : (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Ask ChatGPT about your visitor data..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleChatSubmit()}
                  className="pl-10 h-11"
                />
              </div>
              <Button 
                onClick={handleChatSubmit} 
                disabled={isLoading || !chatMessage.trim()}
                size="sm"
                className="h-11"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          )}
        </div>
        
        <Button
          variant={chatMode ? "default" : "outline"}
          onClick={() => {
            setChatMode(!chatMode);
            if (chatMode) {
              setAiInsight('');
              setChatMessage('');
            }
          }}
          className="h-11 gap-2"
        >
          <Sparkles className="w-4 h-4" />
          {chatMode ? "Exit AI Mode" : "AI Insights"}
        </Button>
      </div>

      {/* Suggested Questions */}
      {chatMode && !aiInsight && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Suggested questions:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setChatMessage(question)}
                  >
                    {question}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Insight Response */}
      {aiInsight && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">AI Insight</span>
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{aiInsight}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAiInsight('')}
              >
                Ask Another Question
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IntelligentSearch;
