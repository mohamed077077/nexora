import ColorContent from "./ColorContent/ColorContent";
import ColorHeader from "./ColorHeader";
import ColorDialog from "./ColorDialog/ColorDialog";

export default function Color() {
    return (
        <section className="flex h-full w-full flex-col items-center justify-center gap-6">
            <ColorHeader />
            <ColorContent />
            <ColorDialog />
        </section>
    );
}