import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ProjectsProvider } from '../context/ProjectsContext';
import { ProfileProvider } from '../context/ProfileContext';

export default function RootLayout() {
  return (
    <ProfileProvider>
      <ProjectsProvider>
        <Tabs
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1e293b',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
            },
            tabBarStyle: {
              backgroundColor: '#1e293b',
              borderTopColor: '#334155',
              borderTopWidth: 1,
              height: 60,
              paddingBottom: 8,
              paddingTop: 4,
            },
            tabBarActiveTintColor: '#3b82f6',
            tabBarInactiveTintColor: '#94a3b8',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Profil',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-circle-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="projects"
            options={{
              title: 'Projekty',
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="briefcase-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="contact"
            options={{
              title: 'Kontakt',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="mail-outline" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </ProjectsProvider>
    </ProfileProvider>
  );
}
