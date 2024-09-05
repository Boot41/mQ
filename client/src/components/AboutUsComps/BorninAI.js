import React from 'react';

const Card = ({ title, subtitle, image }) => (
  <div className="relative w-full h-64 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
    <div className="absolute inset-0 bg-blue-800 bg-opacity-50 flex items-end">
      <div className="p-4">
        <p className="text-white font-semibold">{title}</p>
        <p className="text-blue-200">{subtitle}</p>
      </div>
    </div>
  </div>
);

const AI = () => {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <Card 
        title="İSTİNYE-BEYKOZ ARABALI VAPUR HATTI" 
        subtitle="4 Ağustos 2016" 
        image="a1.jpg" 
      />
      <Card 
        title="DÜNYA DENİZLERİNDE TÜRK NEMO’LAR" 
        subtitle="4 Ağustos 2016" 
        image="a2.jpg" 
      />
      <Card 
        title="ETİS LOJİSTİK, FİLOSUNU 77 ARAÇLA BÜYÜTTÜ" 
        subtitle="4 Ağustos 2016" 
        image="image3.jpg" 
      />
      <Card 
        title="NEMAR DENİZCİLİK YENİ GEMİSİNİ" 
        subtitle="4 Ağustos 2016" 
        image="image4.jpg" 
      />
    </div>
  );
};

export default AI;
