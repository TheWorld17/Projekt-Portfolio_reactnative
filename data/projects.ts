export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  year: number;
}

export const defaultProjects: Project[] = [
  {
    id: '1',
    name: 'FitCore Landing Page',
    description:
      'Modern fitness trainer landing page with automated booking system. Responsive design with smooth animations and integrated calendar for scheduling training sessions.',
    technologies: ['HTML', 'CSS', 'Tailwind'],
    year: 2025,
  },
  {
    id: '2',
    name: 'Massage Studio',
    description:
      'Lead-focused landing page with booking integration for a professional massage studio. Optimized for conversions with clear CTAs and online appointment scheduling.',
    technologies: ['HTML', 'CSS', 'JS'],
    year: 2025,
  },
  {
    id: '3',
    name: 'Enterprise Network',
    description:
      'Scalable enterprise network design with VLSM addressing and Inter-VLAN routing implemented in Cisco Packet Tracer. Includes multiple departments with proper network segmentation and redundancy.',
    technologies: ['Cisco IOS', 'VLAN', 'OSPF', 'VLSM'],
    year: 2025,
  },
  {
    id: '4',
    name: 'Corporate VPN Network',
    description:
      'Multi-site WireGuard VPN deployment with MikroTik CHR routers and OSPF dynamic routing, fully simulated in VMware Workstation. Secure inter-site communication with encrypted tunnels.',
    technologies: ['MikroTik', 'WireGuard', 'OSPF', 'VMware'],
    year: 2026,
  },
];
