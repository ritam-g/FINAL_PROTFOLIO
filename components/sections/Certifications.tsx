"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { certifications } from "@/data/certifications";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/Card";
import { fadeInUp } from "@/lib/utils/animations";

export function Certifications() {
  return (
    <SectionWrapper id="certifications">
      <SectionHeading title="Certifications" subtitle="Credentials" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert, idx) => (
          <motion.div
            key={cert.title}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="h-full"
          >
            <Card className="p-6 flex items-start gap-4 hover:border-accent/50 transition-colors h-full">
              <div className="p-3 bg-surface border border-border-color rounded-xl text-accent flex-shrink-0">
                <Award size={24} className="text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-1">{cert.title}</h3>
                <p className="text-sm text-muted">{cert.issuer}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
