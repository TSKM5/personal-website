import { FOLIO_ENDPOINT } from "../../config/Endpoints";
import { ContactForm } from "../../utils/types/FolioApiTypes";

export async function postContactForm(contactForm:ContactForm):Promise<boolean> {
    try {
        const response:Response = await fetch(
            FOLIO_ENDPOINT + "sendContactForm",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contactForm),
            }
        );
        const responseText = await response.text();
        if (responseText.includes('Success')) {
            return true;
        } else {
            return false;
        }        
    } catch (error) {
        return false; 
    }
}

export async function callDownloadApi(src: string) {
    const response = await fetch(src);
    
    if (!response.ok) {
        throw new Error("Failed to fetch.");
    }

    const blob = await response.blob();
    const urlBlob = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = urlBlob;
    link.download = 'File Organiser.exe';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(urlBlob);
}
