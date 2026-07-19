"use client"

import { Card, CardContent } from "@/components/ui/Card"
import { HiSun, HiCloud, HiLightningBolt } from "react-icons/hi"

const mockWeather = {
  city: "القاهرة",
  temp: 32,
  condition: "مشمس",
  humidity: 45,
  wind: 12,
  icon: "sun",
  forecast: [
    { day: "السبت", temp: 31, icon: "sun" },
    { day: "الأحد", temp: 29, icon: "cloud" },
    { day: "الإثنين", temp: 28, icon: "cloud" },
    { day: "الثلاثاء", temp: 30, icon: "sun" },
  ],
}

function WeatherIcon({ icon, className }: { icon: string; className?: string }) {
  switch (icon) {
    case "sun": return <HiSun className={className} />
    case "cloud": return <HiCloud className={className} />
    case "rain": return <HiLightningBolt className={className} />
    default: return <HiSun className={className} />
  }
}

export default function WeatherWidget() {
  return (
    <Card>
      <CardContent className="py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-text-tertiary">{mockWeather.city}</p>
            <p className="text-3xl font-bold text-text">{mockWeather.temp}°</p>
            <p className="text-sm text-text-secondary">{mockWeather.condition}</p>
          </div>
          <div className="text-warning">
            <WeatherIcon icon={mockWeather.icon} className="w-14 h-14" />
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-text-tertiary mb-4 pb-4 border-b border-border">
          <span>الرطوبة: {mockWeather.humidity}%</span>
          <span>الرياح: {mockWeather.wind} كم/س</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {mockWeather.forecast.map((f) => (
            <div key={f.day} className="text-center">
              <p className="text-xs text-text-tertiary mb-1">{f.day}</p>
              <WeatherIcon icon={f.icon} className="w-5 h-5 mx-auto mb-1 text-text-secondary" />
              <p className="text-sm font-medium text-text">{f.temp}°</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
