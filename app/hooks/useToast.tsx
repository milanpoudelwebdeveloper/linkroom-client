import { useToast } from "@/components/ui/use-toast";

const useCustomToast = () => {
  const { toast } = useToast();
  const showToast = (
    title: string,
    variant: "default" | "destructive" = "default",
    description?: string
  ) => {
    toast({
      title,
      description,
      variant,
    });
  };
  return { showToast };
};

export default useCustomToast;
