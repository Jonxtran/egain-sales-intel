
import { useState } from 'react';
import { Search, MessageCircle, Sparkles, Send, Loader2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface IntelligentSearchProps {
  onSearch: (term: string) => void;
  searchTerm: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const IntelligentSearch = ({ onSearch, searchTerm }: IntelligentSearchProps) => {
  const [chatMode, setChatMode] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const { toast } = useToast();

  const handleChatSubmit = async () => {
    if (!chatMessage.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: chatMessage,
      timestamp: new Date()
    };

    setConversation(prev => [...prev, userMessage]);
    setIsLoading(true);
    setChatMessage('');

    try {
      // Prepare conversation history for the API
      const conversationHistory = conversation.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const { data, error } = await supabase.functions.invoke('chat-insights', {
        body: { 
          message: chatMessage,
          conversationHistory: conversationHistory
        }
      });

      if (error) throw error;

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.insight,
        timestamp: new Date()
      };

      setConversation(prev => [...prev, assistantMessage]);
      
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

  const clearConversation = () => {
    setConversation([]);
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
              setChatMessage('');
            }
          }}
          className="h-11 gap-2"
        >
          <Sparkles className="w-4 h-4" />
          {chatMode ? "Exit AI Mode" : "AI Insights"}
        </Button>
      </div>

      {/* Chat Interface */}
      {chatMode && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                AI Conversation
              </CardTitle>
              {conversation.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearConversation}
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Conversation History */}
            {conversation.length > 0 && (
              <ScrollArea className="h-64 w-full rounded-md border p-4">
                <div className="space-y-4">
                  {conversation.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm">ChatGPT is analyzing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}

            {/* Suggested Questions */}
            {conversation.length === 0 && (
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
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IntelligentSearch;
