import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useProjects } from '../../context/ProjectsContext';

interface FormErrors {
  name?: string;
  description?: string;
  technologies?: string;
  year?: string;
}

export default function NewProjectScreen() {
  const { addProject } = useProjects();
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [year, setYear] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (name.trim().length < 3) {
      newErrors.name = 'Nazwa musi mieć co najmniej 3 znaki.';
    }

    if (description.trim().length < 10) {
      newErrors.description = 'Opis musi mieć co najmniej 10 znaków.';
    }

    const techArray = technologies
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    if (techArray.length < 1) {
      newErrors.technologies = 'Podaj co najmniej 1 technologię.';
    }

    const yearNum = parseInt(year, 10);
    if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2030) {
      newErrors.year = 'Rok musi być liczbą między 2000 a 2030.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const techArray = technologies
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    addProject({
      name: name.trim(),
      description: description.trim(),
      technologies: techArray,
      year: parseInt(year, 10),
    });

    Alert.alert('Sukces', 'Projekt został dodany!', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Dodaj nowy projekt</Text>
          <Text style={styles.subtitle}>
            Wypełnij wszystkie pola, aby dodać projekt do portfolio.
          </Text>

          {/* Name */}
          <Text style={styles.label}>Nazwa projektu</Text>
          <TextInput
            style={[styles.input, errors.name ? styles.inputError : null]}
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors((e) => ({ ...e, name: undefined }));
            }}
            placeholder="np. Moja Aplikacja"
            placeholderTextColor="#64748b"
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          {/* Description */}
          <Text style={styles.label}>Opis</Text>
          <TextInput
            style={[styles.input, styles.textArea, errors.description ? styles.inputError : null]}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              if (errors.description) setErrors((e) => ({ ...e, description: undefined }));
            }}
            placeholder="Opisz swój projekt..."
            placeholderTextColor="#64748b"
            multiline
            numberOfLines={4}
          />
          {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

          {/* Technologies */}
          <Text style={styles.label}>Technologie (oddzielone przecinkami)</Text>
          <TextInput
            style={[styles.input, errors.technologies ? styles.inputError : null]}
            value={technologies}
            onChangeText={(text) => {
              setTechnologies(text);
              if (errors.technologies) setErrors((e) => ({ ...e, technologies: undefined }));
            }}
            placeholder="React, TypeScript, Node.js"
            placeholderTextColor="#64748b"
          />
          {errors.technologies && <Text style={styles.errorText}>{errors.technologies}</Text>}

          {/* Year */}
          <Text style={styles.label}>Rok</Text>
          <TextInput
            style={[styles.input, errors.year ? styles.inputError : null]}
            value={year}
            onChangeText={(text) => {
              setYear(text);
              if (errors.year) setErrors((e) => ({ ...e, year: undefined }));
            }}
            placeholder="2025"
            placeholderTextColor="#64748b"
            keyboardType="number-pad"
            maxLength={4}
          />
          {errors.year && <Text style={styles.errorText}>{errors.year}</Text>}

          {/* Submit */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Dodaj projekt</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 24,
    lineHeight: 20,
  },
  label: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#f8fafc',
    marginBottom: 4,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 13,
    marginBottom: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
