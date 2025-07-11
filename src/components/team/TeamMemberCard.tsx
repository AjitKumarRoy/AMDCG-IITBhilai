// FILE: src/components/team/TeamMemberCard.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
  FaGlobe, // Website
  FaLinkedin, // LinkedIn
  FaTwitter, // Twitter
  FaGithub, // GitHub
  FaGraduationCap, // Used for Google Scholar
  FaLink // Used for ResearchGate
} from 'react-icons/fa';

// Define the shape of a single team member (matching team.json)
interface TeamMember {
  id: string;
  name: string;
  title: string;
  category: string;
  image: string;
  bio: string;
  socialLinks: {
    website?: string | null;
    researchGate?: string | null;
    googleScholar?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
    github?: string | null;
  };
  contributions: Array<{
    project: string;
    role: string;
    years: string;
    description: string;
  }>;
  workingStatus: string;
  yearsWorked: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
  onClick: (member: TeamMember) => void; // Function to open modal with this member
}

// Variants for individual card animations
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 120,
    },
  },
  hover: {
    scale: 1.03,
    // Enhanced boxShadow for more lift
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    borderColor: "var(--color-blue-500)", // Add a subtle border color change (requires CSS variable or direct color)
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  },
  // Add a whileTap variant for immediate feedback on click/tap
  tap: {
    scale: 0.98, // Slightly shrink on tap
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const socialIconMap: { [key: string]: React.ElementType } = {
  website: FaGlobe,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  github: FaGithub,
  googleScholar: FaGraduationCap,
  researchGate: FaLink,
};

export default function TeamMemberCard({ member, onClick }: TeamMemberCardProps) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer flex flex-col h-full"
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap" // Add the whileTap prop here
      onClick={() => onClick(member)}
      // Add group class to allow child elements to react to parent hover
      // Also, set a CSS variable for the border color for dark mode support
      style={{ '--color-blue-500': '#3b82f6' } as React.CSSProperties} // Define CSS variable for blue-500
    >
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <h3 className="text-white text-2xl font-bold drop-shadow-md">{member.name}</h3>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg mb-2">{member.title}</p>
        <p className="text-gray-700 dark:text-gray-300 text-base mb-4 flex-grow line-clamp-3">{member.bio}</p>

        {/* View More Text */}
        <div className="mt-auto pt-2 text-center">
          <p className="text-blue-500 dark:text-blue-400 font-semibold hover:underline text-sm">
            View More
          </p>
        </div>
        
        {/* Social Links for Card (only if they exist) */}
        <div className="flex flex-wrap gap-2 mt-2 pt-4 border-t border-gray-100 dark:border-gray-700">
          {Object.entries(member.socialLinks).map(([key, value]) => {
            if (value) {
              const Icon = socialIconMap[key];
              return (
                <Link
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-600 dark:hover:text-blue-200 transition-colors duration-200 shadow-sm"
                  aria-label={`${member.name}'s ${key}`}
                  onClick={(e) => e.stopPropagation()} // Prevent modal from opening when clicking social links
                >
                  {Icon && <Icon className="w-5 h-5" />}
                </Link>
              );
            }
            return null;
          })}
        </div>
      </div>
    </motion.div>
  );
}