import { Suspense } from "react";
import SuccessContent from "./SucessContent";

export default function SuccessPage() {

    return (
        <Suspense fallback={<p>Checking payment...</p>}>
            <SuccessContent />
        </Suspense>
    );
}