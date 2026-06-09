import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useProjects } from '../../context/ProjectsContext';

export default function ProjectDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { projects, removeProject } = useProjects();
  const router = useRouter();

  const project = projects.find((p) => p.id === id);

  const handleDelete = () => {
    if (!project) return;

    Alert.alert(
      'Potwierdź usunięcie',
      `Czy na pewno chcesz usunąć projekt "${project.name}"?`,
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Usuń',
          style: 'destructive',
          onPress: () => {
            removeProject(project.id);
            router.back();
          },
        },
      ]
    );
  };

  if (!project) {
    return (
      <View style={styles.notFoundContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#64748b" />
        <Text style={styles.notFoundText}>Nie znaleziono projektu</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#ffffff" />
          <Text style={styles.backButtonText}>Wróć do listy</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={styles.yearBadge}>
          <Text style={styles.yearText}>{project.year}</Text>
        </View>
        <Text style={styles.projectName}>{project.name}</Text>
      </View>

      {/* Description Card */}
      <View style={styles.card}>
        <View style={styles.cardTitleRow}>
          <Ionicons name="document-text-outline" size={20} color="#3b82f6" />
          <Text style={styles.cardTitle}>Opis</Text>
        </View>
        <Text style={styles.descriptionText}>{project.description}</Text>
      </View>

      {/* Technologies Card */}
      <View style={styles.card}>
        <View style={styles.cardTitleRow}>
          <Ionicons name="code-slash-outline" size={20} color="#3b82f6" />
          <Text style={styles.cardTitle}>Technologie</Text>
        </View>
        {project.technologies.map((tech, index) => (
          <View key={index} style={styles.techRow}>
            <View style={styles.bullet} />
            <Text style={styles.techRowText}>{tech}</Text>
          </View>
        ))}
      </View>

      {/* Delete Button */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Ionicons name="trash-outline" size={20} color="#ffffff" />
        <Text style={styles.deleteButtonText}>Usuń projekt</Text>
      </TouchableOpacity>
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
  notFoundContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    fontSize: 18,
    color: '#64748b',
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    gap: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  headerCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  yearBadge: {
    backgroundColor: '#1e3a5f',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  yearText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '700',
  },
  projectName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#f8fafc',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f8fafc',
  },
  descriptionText: {
    fontSize: 15,
    color: '#cbd5e1',
    lineHeight: 24,
  },
  techRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
    marginRight: 12,
  },
  techRowText: {
    fontSize: 15,
    color: '#e2e8f0',
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#dc2626',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    gap: 8,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
