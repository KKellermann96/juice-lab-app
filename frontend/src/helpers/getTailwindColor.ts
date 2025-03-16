import tailwindConfig from "../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

const fullConfig = resolveConfig(tailwindConfig);

const getTailwindColor = (
  colorName: string,
  colorIntensity: string
): string => {
  if (!fullConfig.theme?.colors) {
    throw new Error("Tailwind colors are not available");
  }
  const colorObj = (fullConfig.theme.colors as any)[colorName] as Record<
    string,
    string
  >;
  return colorObj[colorIntensity];
};

export default getTailwindColor;
