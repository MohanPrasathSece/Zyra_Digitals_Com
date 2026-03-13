import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // DYNAMIC URL based on environment
      // In development, Vite proxys /api to http://localhost:5000/api
      // In production, the same domain serves both.
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message Sent Successfully!",
          description: "We've received your message and sent you a confirmation email.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error Sending Message",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-foreground">
          Name
        </Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="mt-2"
          placeholder="Your name"
        />
      </div>

      <div>
        <Label htmlFor="email" className="text-foreground">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="mt-2"
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <Label htmlFor="message" className="text-foreground">
          Message
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          className="mt-2 min-h-[150px]"
          placeholder="Tell us about your project..."
        />
      </div>

      <Button type="submit" variant="gold" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>

      <p className="text-sm text-muted-foreground text-center">
        Or email us directly at{" "}
        <a href="mailto:zyradigitalsofficial@gmail.com" className="text-gold hover:underline">
          zyradigitalsofficial@gmail.com
        </a>
      </p>
    </form>
  );
};
