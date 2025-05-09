
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const StripeConfig = () => {
  const [publishableKey, setPublishableKey] = useState("");
  const [webhookSecret, setWebhookSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [configId, setConfigId] = useState<string | null>(null);
  const [showKeys, setShowKeys] = useState(false);
  
  const supabase = useSupabaseClient();

  useEffect(() => {
    fetchStripeConfig();
  }, []);

  const fetchStripeConfig = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("stripe_config")
        .select("*")
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (data) {
        setPublishableKey(data.publishable_key);
        setWebhookSecret(data.webhook_secret || "");
        setConfigId(data.id);
      }
    } catch (error: any) {
      toast.error("Failed to load Stripe configuration", {
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const saveStripeConfig = async () => {
    try {
      if (!publishableKey) {
        toast.error("Publishable key is required");
        return;
      }

      const configData = {
        publishable_key: publishableKey,
        webhook_secret: webhookSecret,
        updated_at: new Date().toISOString()
      };

      let error;

      if (configId) {
        // Update existing config
        const { error: updateError } = await supabase
          .from("stripe_config")
          .update(configData)
          .eq("id", configId);
        error = updateError;
      } else {
        // Create new config
        const { error: insertError } = await supabase
          .from("stripe_config")
          .insert([configData]);
        error = insertError;
      }

      if (error) throw error;

      toast.success("Stripe configuration saved successfully");
      fetchStripeConfig(); // Refresh data
    } catch (error: any) {
      toast.error("Failed to save Stripe configuration", {
        description: error.message
      });
    }
  };

  const toggleShowKeys = () => {
    setShowKeys(!showKeys);
  };

  if (loading) {
    return <div className="flex justify-center p-6">Loading Stripe configuration...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stripe Configuration</CardTitle>
        <CardDescription>
          Configure your Stripe payment integration settings. These keys are required for payment processing.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="publishable-key">Publishable Key</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleShowKeys}
              className="h-8 w-8 p-0"
            >
              {showKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <Input
            id="publishable-key"
            type={showKeys ? "text" : "password"}
            value={publishableKey}
            onChange={(e) => setPublishableKey(e.target.value)}
            placeholder="pk_test_..."
          />
          <p className="text-sm text-muted-foreground">
            Find this in your Stripe Dashboard under Developers &gt; API keys
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="webhook-secret">Webhook Secret (Optional)</Label>
          <Input
            id="webhook-secret"
            type={showKeys ? "text" : "password"}
            value={webhookSecret}
            onChange={(e) => setWebhookSecret(e.target.value)}
            placeholder="whsec_..."
          />
          <p className="text-sm text-muted-foreground">
            Required if you're setting up webhook notifications from Stripe
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={saveStripeConfig} className="ml-auto">Save Configuration</Button>
      </CardFooter>
    </Card>
  );
};

export default StripeConfig;
