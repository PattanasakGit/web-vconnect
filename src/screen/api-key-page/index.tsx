import React, { useEffect, useState } from "react";
import { Copy, CopyCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ButtonTheme from "@/components/Button";
import { useTranslation } from "react-i18next";

const ApiKeyPage = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const { t } = useTranslation("translation");

  useEffect(() => {
    const fetchApiKey = async () => {
      const key = "1234567890-test-api-key";
      setApiKey(key);
    };
    fetchApiKey();
  }, []);

  const handleCopy = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInvoke = () => {
    alert("Invoke button clicked!");
  };

  return (
    <div className="h-full w-full p-4   bg-backgound flex justify-center">
      <div className="w-full h-full bg-zinc-100 dark:bg-[#FFFFFF05] rounded-xl p-4 pt-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-gray-200 uppercase">
            {t("api_key_title_page")}
          </h2>

          <Card className="border-2 border-zinc-400 dark:border-zinc-700">
            <CardHeader>
              <CardTitle className="text-xl text-gray-700 dark:text-gray-200">
                {t("your_api_key")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {apiKey ? (
                <div className="flex items-center gap-4">
                  <code className="flex-1 p-4 font-mono text-sm bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto">
                    {apiKey}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <CopyCheck className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              ) : (
                <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <ButtonTheme
              customStyle="gradientBlue"
              onClick={handleInvoke}
              className="px-8 py-2"
            >
              {t("invoke_button")}
            </ButtonTheme>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyPage;
