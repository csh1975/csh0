import React from 'react';

export type CodeSection = {
  id: string;
  title: string;
  description: string;
  fileName: string;
  language: string;
  content: string;
};

export type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};