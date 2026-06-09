import { Stack } from 'expo-router';

export default function ProjectsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1e293b',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Projekty',
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          title: 'Nowy projekt',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Szczegóły projektu',
        }}
      />
    </Stack>
  );
}
