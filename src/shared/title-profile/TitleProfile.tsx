import React from 'react';

export default function TitleProfile({ title }: { title: string | null }) {
  return (
    <h2>{title || "Edit your profile"}</h2>
  );
}
