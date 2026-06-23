import { useStore } from "@/store/useStore";
import ComplexCard from "@/components/cards/ComplexCard";

export default function Complexes() {
  const complexes = useStore(s => s.complexes);
  return (
    <div className="container-x py-10 lg:py-14">
      <div>
        <div className="eyebrow">Новостройки Анапы</div>
        <h1 className="mt-2 font-display text-4xl lg:text-5xl">Все жилые комплексы</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">{complexes.length} ЖК от прямых застройщиков — комфорт, бизнес и премиум-класс.</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {complexes.map(c => <ComplexCard key={c.id} c={c} />)}
      </div>
    </div>
  );
}
