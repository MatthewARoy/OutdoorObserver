import { Redirect } from 'expo-router';

// This screen is never shown — the home tab button navigates to the landing page
export default function HomePlaceholder() {
  return <Redirect href="/" />;
}
