import { YMaps, Map } from "@pbe/react-yandex-maps";

export function MMap({ children, ...props }) {
  return (
    <YMaps>
      <Map {...props}>{children}</Map>
    </YMaps>
  );
}
