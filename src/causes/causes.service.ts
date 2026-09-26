import { Injectable } from '@nestjs/common';

export interface Cause {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  colorClass: string;
}

@Injectable()
export class CausesService {
  private readonly causes: Cause[] = [
    {
      slug: 'education',
      title: 'Education',
      shortDescription: 'Access to quality learning, school support and opportunities for a brighter future.',
      icon: '🎓',
      colorClass: 'pink',
    },
    {
      slug: 'health',
      title: 'Health',
      shortDescription: 'Medical care, health awareness and wellbeing support for vulnerable children.',
      icon: '❤',
      colorClass: 'blue',
    },
    {
      slug: 'food',
      title: 'Food & Nutrition',
      shortDescription: 'Nutritious meals and practical support so children can grow healthy and strong.',
      icon: '🥣',
      colorClass: 'orange',
    },
    {
      slug: 'guidance-counselling',
      title: 'Guidance & Counselling',
      shortDescription: 'Safe, compassionate guidance, counselling and mentorship for children and young people.',
      icon: '👥',
      colorClass: 'purple',
    },
    {
      slug: 'shelter-protection',
      title: 'Shelter & Protection',
      shortDescription: 'Creating safer environments and connecting vulnerable children to protective services.',
      icon: '⌂',
      colorClass: 'red',
    },
    {
      slug: 'skills-future',
      title: 'Skills & Future',
      shortDescription: 'Life skills, vocational opportunities and empowerment for long-term independence.',
      icon: '✦',
      colorClass: 'teal',
    },
  ];

  findAll() {
    return this.causes;
  }

  findOne(slug: string) {
    return this.causes.find((cause) => cause.slug === slug);
  }
}
