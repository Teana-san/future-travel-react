import { useEffect, useRef, useState } from 'react'; // useRef — ссылка на DOM/объект (в нашем случае — на глобус)

import Globe from 'react-globe.gl'; // Это библиотека react-globe.gl — React-обёртка над 3D-глобусом на базе Three.js.

import globeImg from "../assets/mapaColor1.jpg";


export default function GlobeElement({ onCountryClick }) {

    const globeRef = useRef(); // Создаём ссылку на объект глобуса. Через неё потом можно управлять камерой и контролами.

    const [countries, setCountries] = useState({ features: [] }); // Храним страны (GeoJSON). Сначала массив пустой.

    // console.log(countries) покажет объект с разными свойствами, но если мы перейдем в countries.features, то увидим наш массив из 3х стран, который мы выцепили в useEffect в allowedCountries

    // 1. Загружаем границы стран
    useEffect(() => {
        fetch('/ne_110m_admin_0_countries.geojson') // Загружаем GeoJSON файл из public с границами всех стран.
            .then(res => res.json())
            .then(data => {
                const allowedCountries = ["Spain", "Peru", "Russia"]; // это вручную созданный массив из необходимых стран, которые мы будем показывать на глобусе
                const filteredFeatures = data.features.filter(feature =>
                    allowedCountries.includes(feature.properties.NAME) // Из всех стран оставляем только нужные.
                );
                // console.log(allowedCountries) ['Spain', 'Peru', 'Russia']
                setCountries({ ...data, features: filteredFeatures }) // Сохраняем отфильтрованные страны в стейт.
            });
    }, []);


    const handleGlobeReady = () => { // Управление камерой - вызывается когда глобус уже полностью создан
        const controls = globeRef.current.controls(); // Получаем доступ к управлению камерой (OrbitControls).
        controls.enableZoom = true; // Разрешаем зум.
        controls.autoRotate = true; // Включаем авто-вращение.
        controls.autoRotateSpeed = 0.7;

        // Ограничение вращения камеры
        controls.minPolarAngle = Math.PI / 3;   // ниже северного полюса
        controls.maxPolarAngle = Math.PI - Math.PI / 3; // выше южного

        // Дистанция приближения/отдаления
        controls.minDistance = 250;  // насколько близко можно
        controls.maxDistance = 400;  // насколько далеко можно

        globeRef.current.pointOfView({ altitude: 2 }, 0); // это начальный зум глобуса, по стандарту 2.5, чем ниже тем больше

    };

    const labelData = [
        { lat: 40.463667, lng: -3.74922, text: "Spain", color: "black" },
        { lat: -9.19, lng: -75.0152, text: "Peru", color: "black" },
        { lat: 61.5240, lng: 105.3188, text: "Russia", color: "black" },
    ]; //это просто текст поверх страны - метки/надписи



    return (
        <div className="cursor-grab active:cursor-grabbing">
            <Globe // компонент глобуса из библиотеки react-globe.gl

                ref={globeRef} // Привязываем ref к объекту глобуса, который мы создали в самом начале
                onGlobeReady={handleGlobeReady} // Вызываем функцию после загрузки.
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl={globeImg}
                globeScale={1.25}

                // 2. Добавляем метки/надписи
                labelsData={labelData}
                labelLat="lat"
                labelLng="lng"
                labelText="text"
                labelSize={1.5}
                labelColor="color"
                labelDotRadius={0.3} // Маленькая точка рядом с текстом
                labelAltitude={0.02} // Чтобы текст был чуть над поверхностью


                // 3. Рисуем страны (полигоны)
                polygonsData={countries.features} // Передаём массив стран.
                polygonCapColor={(d) =>
                    d.properties.NAME === "Spain" ? 'rgba(255, 100, 100, 0.5)' :
                        d.properties.NAME === "Peru" ? 'rgba(100, 255, 100, 0.5)' :
                            d.properties.NAME === "Russia" ? 'rgba(100, 100, 255, 0.5)' :
                                'rgba(255, 255, 255, 0.1)' // тут задаем цвета для нужных стран и для всех остальных
                }
                polygonStrokeColor={() => '#ffffff'} // обводка стран
                onPolygonClick={(polygon) => {
                    const countryName = polygon.properties.NAME;
                    onCountryClick(countryName);
                }}


                width={700}
                height={700}
            />
        </div>
    );
}



/* 
export default function GlobeElement() {

  const globeRef = useRef();
  const [zoomEnabled, setZoomEnabled] = useState(false);

 const handleGlobeReady = () => {
    const globe = globeRef.current;
    if (!globe) return;

    // Настройка управления
    const controls = globe.controls();
    controls.enableZoom = zoomEnabled; // Мы привязали его к клику, чтобы случайный скролл страницы не превращался в резкое приближение к Антарктиде.
    controls.autoRotate = true; // Чтобы глобус жил своей жизнью и крутился.
    controls.autoRotateSpeed = 0.7;
    
    // Ограничения камеры --- Чтобы пользователь не мог заглянуть "внутрь" глобуса через полюса (ограничили наклон камеры).
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI - Math.PI / 4;
    

    // Настройка материала (теперь безопасно!)
    const material = globe.globeMaterial();
    material.transparent = true;
    material.alphaTest = 0.5;
    material.opacity = 1;
  };

return (
    <div 
      className="cursor-grab active:cursor-grabbing"
      onClick={(e) => {
        e.stopPropagation();
        setZoomEnabled(true); // Включаем зум при клике
      }}
    >
      <Globe
        ref={globeRef}
        onGlobeReady={handleGlobeReady} // Самый важный момент
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={globeImg}
        width={700}
        height={700}
        showAtmosphere={true}
        atmosphereColor="white"
        atmosphereAltitude={0.1}
      />
    </div>
  );
} */