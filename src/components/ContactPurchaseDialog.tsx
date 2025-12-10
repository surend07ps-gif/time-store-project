import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare } from "lucide-react";

interface ContactPurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  watchName?: string;
}

const ContactPurchaseDialog = ({ 
  open, 
  onOpenChange,
  watchName
}: ContactPurchaseDialogProps) => {
  const handleEmail = () => {
    const subject = watchName 
      ? `Inquiry about ${watchName}` 
      : "Watch Purchase Inquiry";
    window.location.href = `mailto:akashverma23644@gmail.com?subject=${encodeURIComponent(subject)}`;
  };

  const handlePhone = () => {
    window.location.href = "tel:+917020466284";
  };

  const handleWhatsApp = () => {
    const message = watchName 
      ? `Hi, I'm interested in purchasing the ${watchName}.` 
      : "Hi, I'm interested in purchasing a watch.";
    window.open(`https://wa.me/917020466284?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Contact for Purchase</DialogTitle>
          <DialogDescription>
            {watchName 
              ? `Interested in the ${watchName}? Get in touch with our sales team.`
              : "Get in touch with our sales team to complete your purchase."
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-3 mt-4">
          <Button onClick={handleEmail} variant="outline" className="w-full justify-start">
            <Mail className="mr-3 h-5 w-5" />
            Email Us
            <span className="ml-auto text-muted-foreground text-sm">akashverma23644@gmail.com</span>
          </Button>
          
          <Button onClick={handlePhone} variant="outline" className="w-full justify-start">
            <Phone className="mr-3 h-5 w-5" />
            Call Us
            <span className="ml-auto text-muted-foreground text-sm">+91 7020466284</span>
          </Button>
          
          <Button onClick={handleWhatsApp} variant="outline" className="w-full justify-start">
            <MessageSquare className="mr-3 h-5 w-5" />
            WhatsApp
            <span className="ml-auto text-muted-foreground text-sm">+91 7020466284</span>
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Our team typically responds within 24 hours.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default ContactPurchaseDialog;
