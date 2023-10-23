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