import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useProfile } from '../context/ProfileContext';

export default function ProfileScreen() {
  const { profile, updateProfile, isLoading } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  // Edit form state
  const [editName, setEditName] = useState(profile.name);
  const [editBio, setEditBio] = useState(profile.bio);
  const [editSkills, setEditSkills] = useState(profile.skills.join(', '));

  const handleEdit = () => {
    setEditName(profile.name);
    setEditBio(profile.bio);
    setEditSkills(profile.skills.join(', '));
    setIsEditing(true);
  };

  const handleSave = () => {
    // Validation
    if (editName.trim().length < 2) {
      Alert.alert('Błąd', 'Imię musi mieć co najmniej 2 znaki.');
      return;
    }
    if (editBio.trim().length < 10) {
      Alert.alert('Błąd', 'Bio musi mieć co najmniej 10 znaków.');
      return;
    }
    const skillsArray = editSkills
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    if (skillsArray.length === 0) {
      Alert.alert('Błąd', 'Podaj co najmniej jedną umiejętność.');
      return;
    }

    updateProfile({
      name: editName.trim(),
      bio: editBio.trim(),
      skills: skillsArray,
    });
    setIsEditing(false);
    Alert.alert('Sukces', 'Profil został zaktualizowany!');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={styles.avatarRing}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.avatar}
            defaultSource={require('../assets/profile.png')}
          />
        </View>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.study}>Informatyka, 6 semestr</Text>
        <Text style={styles.university}>Akademia Śląska w Katowicach</Text>
      </View>

      {!isEditing ? (
        <>
          {/* About Me Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>O mnie</Text>
            <Text style={styles.cardText}>{profile.bio}</Text>
          </View>

          {/* Skills Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Umiejętności</Text>
            <View style={styles.skillsContainer}>
              {profile.skills.map((skill, index) => (
                <View key={index} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Edit Button */}
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editButtonText}>Edytuj profil</Text>
          </TouchableOpacity>
        </>
      ) : (
        /* Edit Form */
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Edytuj profil</Text>

          <Text style={styles.label}>Imię i nazwisko</Text>
          <TextInput
            style={styles.input}
            value={editName}
            onChangeText={setEditName}
            placeholder="Imię i nazwisko"
            placeholderTextColor="#64748b"
          />

          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={editBio}
            onChangeText={setEditBio}
            placeholder="Twoje bio"
            placeholderTextColor="#64748b"
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Umiejętności (oddzielone przecinkami)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={editSkills}
            onChangeText={setEditSkills}
            placeholder="React, TypeScript, ..."
            placeholderTextColor="#64748b"
            multiline
            numberOfLines={3}
          />

          <View style={styles.formButtons}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Zapisz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Anuluj</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarRing: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 3,
    borderColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: 4,
  },
  study: {
    fontSize: 15,
    color: '#3b82f6',
    fontWeight: '600',
  },
  university: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 2,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 15,
    color: '#cbd5e1',
    lineHeight: 22,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: '#1e3a5f',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  skillText: {
    color: '#93c5fd',
    fontSize: 13,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
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
    marginBottom: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#334155',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#cbd5e1',
    fontSize: 16,
    fontWeight: '600',
  },
});
