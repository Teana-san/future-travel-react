import { useEffect, useRef, useState } from 'react'; // useRef — ссылка на DOM/объект (в нашем случае — на глобус)

import Globe from 'react-globe.gl'; // Это библиотека react-globe.gl — React-обёртка над 3D-глобусом на базе Three.js.

import globeImg from "../assets/mapaColor1.jpg";

import { allowedCountriesGeo } from '../geodata/allowedCountriesGeo';


export default function GlobeElement({ onCountryClick }) {

    const globeRef = useRef(); // Создаём ссылку на объект глобуса. Через неё потом можно управлять камерой и контролами.


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
                polygonsData={allowedCountriesGeo.features} // Передаём массив стран.
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