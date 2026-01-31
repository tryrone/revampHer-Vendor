import {
  ThemedText as ThemedTextComponent,
  ThemedTextProps,
} from "./themed-text";

export function ThemedText(props: ThemedTextProps) {
  return (
    <ThemedTextComponent
      {...props}
      style={[props.style, { fontFamily: "SpaceMono" }]}
    />
  );
}
