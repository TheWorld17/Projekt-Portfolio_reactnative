import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ContactItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  action?: () => void;
  actionLabel?: string;
}

const contactData: ContactItem[] = [
  {
    icon: 'mail-outline',
    label: 'Email',
    value: 'broroman8@gmail.com',
    action: () => Linking.openURL('mailto:broroman8@gmail.com'),
    actionLabel: 'Wyślij e-mail',
  },
  {
    icon: 'logo-github',
    label: 'GitHub',
    value: 'github.com/TheWorld17',
    action: () => Linking.openURL('https://github.com/TheWorld17'),
    actionLabel: 'Otwórz GitHub',
  },
  {
    icon: 'logo-linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/roman-vykeryk',
    action: () =>
      Linking.openURL('https://www.linkedin.com/in/roman-vykeryk-b8a133336/'),
    actionLabel: 'Otwórz LinkedIn',
  },
  {
    icon: 'location-outline',
    label: 'Lokalizacja',
    value: 'Katowice, Poland',
  },
];

export default function ContactScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIconContainer}>
          <Ionicons name="chatbubbles-outline" size={40} color="#3b82f6" />
        </View>
        <Text style={styles.headerTitle}>Kontakt</Text>
        <Text style={styles.headerSubtitle}>
          Masz pytanie lub propozycję współpracy? Skontaktuj się ze mną!
        </Text>
      </View>

      {/* Contact Cards */}
      {contactData.map((item, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Ionicons name={item.icon} size={22} color="#3b82f6" />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardLabel}>{item.label}</Text>
              <Text style={styles.cardValue}>{item.value}</Text>
            </View>
          </View>
          {item.action && (
            <TouchableOpacity style={styles.actionButton} onPress={item.action}>
              <Ionicons name="open-outline" size={16} color="#ffffff" />
              <Text style={styles.actionButtonText}>{item.actionLabel}</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  headerIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardInfo: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  cardValue: {
    fontSize: 16,
    color: '#f8fafc',
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 14,
    gap: 8,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
