"use client"

import { Globe } from "@/components/ui/Globe"
import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/AnimatedSection"

const markers = [
  { id: "london", location: [51.5074, -0.1278] as [number, number], label: "London" },
  { id: "vancouver", location: [49.2827, -123.1207] as [number, number], label: "Vancouver" },
  { id: "dhaka", location: [23.8103, 90.4125] as [number, number], label: "Bangladesh" },
  { id: "india", location: [11.0168, 76.9558] as [number, number], label: "India" },
  { id: "accra", location: [5.6037, -0.1870] as [number, number], label: "Ghana" },
  { id: "sydney", location: [-33.8688, 151.2093] as [number, number], label: "Australia" },
  { id: "nyc", location: [40.7128, -74.006] as [number, number], label: "USA" },
  { id: "toronto", location: [43.6532, -79.3832] as [number, number], label: "Canada" },
  { id: "delta", location: [49.0847, -122.9103] as [number, number], label: "Delta" },
  { id: "ladner", location: [49.0911, -123.0831] as [number, number], label: "Ladner" },
  { id: "mission", location: [49.1337, -122.3112] as [number, number], label: "Mission" },
]

const arcs = [
  {
    id: "india-london",
    from: [11.0168, 76.9558] as [number, number],
    to: [51.5074, -0.1278] as [number, number],
    label: "India → London",
  },
  {
    id: "india-nyc",
    from: [11.0168, 76.9558] as [number, number],
    to: [40.7128, -74.006] as [number, number],
    label: "India → USA",
  },
  {
    id: "india-sydney",
    from: [11.0168, 76.9558] as [number, number],
    to: [-33.8688, 151.2093] as [number, number],
  },
]

export function InternationalClients() {
  return (
    <AnimatedSection animation="fade-up" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content Side */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-2 mb-6">
                <span className="font-secondary text-sm text-gold font-bold tracking-wider">Global Reach</span>
              </div>
              <h2 className="font-heading text-4xl sm:text-6xl font-bold text-foreground mb-8 leading-tight">
                Trusted by <span className="text-gold">International</span> Brands
              </h2>
              <p className="font-secondary text-lg text-muted-foreground mb-12 max-w-xl mx-auto lg:mx-0">
                Our creative solutions transcend borders. From startups in Silicon Valley to established enterprises in Tokyo, we partner with visionary brands worldwide to deliver exceptional digital experiences.
              </p>
              
            </motion.div>
          </div>

          {/* Globe Side */}
          <div className="flex-1 w-full max-w-2xl relative">
            <div className="absolute inset-0 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <Globe
                markers={markers}
                arcs={arcs}
                markerColor={[1, 0.7, 0.2]} // Vibrant markers
                baseColor={[0.1, 0.4, 0.8]} // Real Blue Ocean
                glowColor={[1, 1, 1]} // White Atmosphere glow
                dark={0} // Brighter, realistic look
                mapBrightness={6}
                markerSize={0.06}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
