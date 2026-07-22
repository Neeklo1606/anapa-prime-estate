import logoAsset from "@/assets/logo-ua.png.asset.json";

export default function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Южный Акцент · агентство недвижимости"
      className={`${className} w-auto object-contain select-none`}
      draggable={false}
    />
  );
}
