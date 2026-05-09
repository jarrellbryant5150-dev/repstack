import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
  Modal,
  Vibration,
  Animated,
  Easing,
} from "react-native";

const motivationalQuotes = [
  "Missing the goal is not failure. Quitting is failure.",
  "Small progress still beats standing still.",
  "You showed up. Now show up again tomorrow.",
  "The body follows what the mind refuses to quit.",
  "One missed goal is just data. Adjust and attack again.",
  "Discipline is built on the days that do not feel perfect.",
  "You are still in the fight. Log it, learn from it, and come back stronger.",
];

const dailyGoals = { volume: 10000 };

const defaultExercises = [
  "Barbell Row",
  "Bench Press",
  "Bicep Curl",
  "Calf Raise",
  "Cable Bicep Curl",
  "Cable Chest Fly",
  "Cable Crossover",
  "Cable Decline Fly",
  "Cable Face Pull",
  "Cable Front Raise",
  "Cable Glute Kickback",
  "Cable Hammer Curl",
  "Cable High Row",
  "Cable Incline Fly",
  "Cable Kickback",
  "Cable Lateral Raise",
  "Cable Lat Pulldown",
  "Cable Leg Curl",
  "Cable Leg Extension",
  "Cable Low Row",
  "Cable Overhead Tricep Extension",
  "Cable Preacher Curl",
  "Cable Pullover",
  "Cable Rear Delt Fly",
  "Cable Rope Crunch",
  "Cable Seated Row",
  "Cable Shoulder Press",
  "Cable Skull Crusher",
  "Cable Squat",
  "Cable Straight Arm Pulldown",
  "Cable Tricep Pushdown",
  "Cable Upright Row",
  "Chest Supported Dumbbell Row",
  "Concentration Curl",
  "Deadlift",
  "Decline Bench Press",
  "Dumbbell Arnold Press",
  "Dumbbell Bench Press",
  "Dumbbell Bicep Curl",
  "Dumbbell Calf Raise",
  "Dumbbell Deadlift",
  "Dumbbell Fly",
  "Dumbbell Front Raise",
  "Dumbbell Incline Press",
  "Dumbbell Kickback",
  "Dumbbell Lateral Raise",
  "Dumbbell Preacher Curl",
  "Dumbbell Pullover",
  "Dumbbell Rear Delt Fly",
  "Dumbbell Romanian Deadlift",
  "Dumbbell Shoulder Press",
  "Dumbbell Skull Crusher",
  "Dumbbell Split Squat",
  "Dumbbell Tricep Extension",
  "Dumbbell Walking Lunge",
  "Goblet Squat",
  "Hammer Curl",
  "Incline Bench Press",
  "Lat Pulldown",
  "Leg Curl",
  "Leg Extension",
  "Leg Press",
  "Leverage Bicep Curl",
  "Leverage Calf Raise",
  "Leverage Chest Press",
  "Leverage Decline Chest Press",
  "Leverage Dip Machine",
  "Leverage Hack Squat",
  "Leverage High Row",
  "Leverage Incline Chest Press",
  "Leverage Iso Row",
  "Leverage Lat Pulldown",
  "Leverage Leg Curl",
  "Leverage Leg Extension",
  "Leverage Leg Press",
  "Leverage Low Row",
  "Leverage Preacher Curl",
  "Leverage Pullover",
  "Leverage Shoulder Press",
  "Leverage Shrug",
  "Leverage Squat",
  "Leverage Tricep Extension",
  "Overhead Press",
  "Pull Up",
  "Romanian Deadlift",
  "Seated Cable Row",
  "Squat",
  "Tricep Pushdown",
];

const avatarStages = [
  { level: 1, min: 0, max: 499, title: "Lone Wanderer", subtitle: "The Journey Begins", color: "#9ca3af", aura: "#6b7280" },
{ level: 2, min: 500, max: 999, title: "Pack Initiate", subtitle: "Respect of the Pack", color: "#22c55e", aura: "#16a34a" },
{ level: 3, min: 1000, max: 1999, title: "Fang Disciple", subtitle: "The Fang Sharpens", color: "#38bdf8", aura: "#0284c7" },
{ level: 4, min: 2000, max: 3499, title: "Moon Hunter", subtitle: "Eyes of the Night", color: "#cbd5e1", aura: "#64748b" },
{ level: 5, min: 3500, max: 4999, title: "Ironfang", subtitle: "Battle Forged", color: "#ef4444", aura: "#991b1b" },
{ level: 6, min: 5000, max: 6999, title: "Alpha Warrior", subtitle: "Peak Mortal Form", color: "#60a5fa", aura: "#1d4ed8" },
  { level: 7, min: 7000, max: 9499, title: "Bloodfang", subtitle: "The Beast Awakens", color: "#38bdf8", aura: "#0ea5e9" },
{ level: 8, min: 9500, max: 12499, title: "Dire Howler", subtitle: "Claws of the Pack", color: "#60a5fa", aura: "#1d4ed8" },
{ level: 9, min: 12500, max: 15999, title: "Shadow Lupine", subtitle: "Moonlit Fury", color: "#a855f7", aura: "#7e22ce" },
{ level: 10, min: 16000, max: 19999, title: "Fenrir Spawn", subtitle: "The Human Form Breaks", color: "#c084fc", aura: "#9333ea" },
{ level: 11, min: 20000, max: 24999, title: "Omega Wolf", subtitle: "Half Man. Half Monster.", color: "#d946ef", aura: "#86198f" },
  { level: 12, min: 25000, max: 29999, title: "Hellforged", subtitle: "Forged in Chaos", color: "#f97316", aura: "#991b1b" },
  { level: 13, min: 30000, max: 34999, title: "Frost Revenant", subtitle: "Cold. Silent. Deadly.", color: "#7dd3fc", aura: "#075985" },
  { level: 14, min: 35000, max: 39999, title: "Radiant Paladin", subtitle: "Light in the Darkness", color: "#facc15", aura: "#ca8a04" },
  { level: 15, min: 40000, max: 49999, title: "Void Conqueror", subtitle: "Nothing Can Stop You", color: "#d946ef", aura: "#86198f" },
  { level: 16, min: 50000, max: 59999, title: "Dragonbound", subtitle: "Power Beyond Limits", color: "#fb923c", aura: "#9a3412" },
  { level: 17, min: 60000, max: 74999, title: "Celestial Knight", subtitle: "Touched by the Heavens", color: "#93c5fd", aura: "#1e40af" },
  { level: 18, min: 75000, max: 99999, title: "Eternal Tyrant", subtitle: "Eternal. Ruthless. Supreme.", color: "#c084fc", aura: "#581c87" },
  { level: 19, min: 100000, max: 149999, title: "Ascended Overlord", subtitle: "Above All Mortals", color: "#fde047", aura: "#a16207" },
  { level: 20, min: 150000, max: Infinity, title: "Legend", subtitle: "Your Legend Inspires All", color: "#fbbf24", aura: "#7c3aed" },
];

const avatarImages = {
  1: require("./assets/wolf-1.png"),
  2: require("./assets/wolf-2.png"),
  3: require("./assets/wolf-3.png"),
  4: require("./assets/wolf-4.png"),
  5: require("./assets/wolf-5.png"),
  6: require("./assets/wolf-6.png"),
  7: require("./assets/wolf-7.png"),
8: require("./assets/wolf-8.png"),
9: require("./assets/wolf-9.png"),
10: require("./assets/wolf-10.png"),
11: require("./assets/wolf-11.png"),
  12: null,
  13: null,
  14: null,
  15: null,
  16: null,
  17: null,
  18: null,
  19: null,
  20: null,
};

const starterHistory = [
  {
    id: 1,
    date: "Yesterday",
    dateKey: "starter-yesterday",
    exercises: [
      { id: 101, name: "Bench Press", sets: 3, reps: 8, weight: 155 },
      { id: 102, name: "Lat Pulldown", sets: 3, reps: 10, weight: 120 },
    ],
    points: 34,
    hitGoal: false,
    quote: "Small progress still beats standing still.",
    levelAfterWorkout: 1,
    rankAfterWorkout: "Novice",
  },
];

function volumeOf(exercise) {
  return Number(exercise.sets || 0) * Number(exercise.reps || 0) * Number(exercise.weight || 0);
}

function totalVolume(exercises = []) {
  if (!Array.isArray(exercises)) return 0;

  return exercises.reduce(
    (sum, exercise) => sum + volumeOf(exercise),
    0
  );
}

function getAvatarStage(points) {
  return avatarStages.find((stage) => points >= stage.min && points <= stage.max) || avatarStages[0];
}

function getNextStage(stage) {
  return avatarStages.find((candidate) => candidate.level === stage.level + 1);
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
}

function calculateWorkoutPoints(exercises = [], history = []) {
  if (!Array.isArray(exercises) || exercises.length === 0) return 0;
  if (!Array.isArray(history)) history = [];

  const workoutCompletion = 10;
  const exercisePoints = exercises.length * 2;
  const currentVolume = totalVolume(exercises);
  const previousBestDailyVolume = Math.max(
  0,
  ...history.map((day) => totalVolume(day.exercises || []))
);
  const beatDailyRecord = currentVolume > previousBestDailyVolume ? 25 : 0;

  let progressionPoints = 0;

  exercises.forEach((exercise) => {
    const previousSameExerciseVolumes = history
      .flatMap((day) => day.exercises || [])
      .filter((past) => past.name.toLowerCase().trim() === exercise.name.toLowerCase().trim())
      .map(volumeOf);

    const previousBest = Math.max(0, ...previousSameExerciseVolumes);

    if (previousBest > 0 && volumeOf(exercise) > previousBest) {
      progressionPoints += 10;
    }
  });

  return workoutCompletion + exercisePoints + beatDailyRecord + progressionPoints;
}

function getSuggestedLift(exerciseName, history) {
  if (!exerciseName) return null;

  const previousLift = history
    .flatMap((day) => day.exercises)
    .find((exercise) => exercise.name.toLowerCase().trim() === exerciseName.toLowerCase().trim());

  if (!previousLift) return null;

  return {
    name: previousLift.name,
    sets: previousLift.sets,
    reps: previousLift.reps,
    weight: Number(previousLift.weight || 0) + 5,
    previousWeight: previousLift.weight,
  };
}

export default function App() {
  const [activeTab, setActiveTab] = useState("today");
  const [exercises, setExercises] = useState([]);
  const [history, setHistory] = useState(starterHistory);
  const activePath = "wolf";
  const [lifetimePoints, setLifetimePoints] = useState(476);
  const [form, setForm] = useState({
  name: "",
  sets: "",
  reps: "",
  weight: "",
  restSeconds: "90",
  isCustom: "",
});
  const [exerciseDropdownOpen, setExerciseDropdownOpen] = useState(false);
  const [exerciseSearch, setExerciseSearch] = useState("");
  const [savedExercises, setSavedExercises] = useState(defaultExercises);
  const [streak, setStreak] = useState({ count: 0, lastWorkoutDate: null });
  const [levelUpModal, setLevelUpModal] = useState(null);
  const [activeTimers, setActiveTimers] = useState({});

const [completedSets, setCompletedSets] = useState({});
const [workoutStartTime, setWorkoutStartTime] = useState(null);
const [workoutDuration, setWorkoutDuration] = useState(0);

const [workoutTemplates, setWorkoutTemplates] = useState([]);
const [templateName, setTemplateName] = useState("");
  const todayVolume = useMemo(() => totalVolume(exercises), [exercises]);

const todayPoints = useMemo(
  () => calculateWorkoutPoints(exercises, history),
  [exercises, history]
);

const goalHit = todayVolume >= dailyGoals.volume;

const volumeGoalPercent = Math.min(
  100,
  Math.round((todayVolume / dailyGoals.volume) * 100)
);

const totalPoints = lifetimePoints + todayPoints;

const avatar = getAvatarStage(totalPoints);

const nextAvatar = getNextStage(avatar);

const suggestion = useMemo(
  () => getSuggestedLift(form.name, history),
  [form.name, history]
);

const progressToNext = nextAvatar
  ? Math.min(
      100,
      Math.round(
        ((totalPoints - avatar.min) / (nextAvatar.min - avatar.min)) * 100
      )
    )
  : 100;

useEffect(() => {
  const interval = setInterval(() => {
    setActiveTimers((current) => {
      const updated = { ...current };

      Object.keys(updated).forEach((id) => {
        if (updated[id] > 0) {
          updated[id] -= 1;

          if (updated[id] === 0) {
            Vibration.vibrate([0, 300, 150, 300]);
          }
        }
      });

      return updated;
    });
  }, 1000);

  return () => clearInterval(interval);
}, []);
useEffect(() => {
  let interval;

  if (workoutStartTime) {
    interval = setInterval(() => {
      setWorkoutDuration(
        Math.floor((Date.now() - workoutStartTime) / 1000)
      );
    }, 1000);
  }

  return () => clearInterval(interval);
}, [workoutStartTime]);

function updateForm(key, value) {
  setForm((current) => ({
    ...current,
    [key]: value,
  }));
}

  function startRestTimer(exerciseId, restSeconds) {
  setActiveTimers((current) => ({
    ...current,
    [exerciseId]: Number(restSeconds || 90),
  }));
}
function completeSet(exercise) {
  const currentCompleted = completedSets[exercise.id] || 0;

  if (currentCompleted >= exercise.sets) {
    return;
  }

  const nextCompleted = currentCompleted + 1;

  setCompletedSets((current) => ({
    ...current,
    [exercise.id]: nextCompleted,
  }));

  if (nextCompleted < exercise.sets) {
    startRestTimer(exercise.id, exercise.restSeconds);
  }
}

function formatTimer(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
function formatWorkoutDuration(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

  function selectExercise(name) {
    if (name === "Custom Exercise") {
      updateForm("name", "");
      updateForm("isCustom", "true");
      setExerciseDropdownOpen(false);
      setExerciseSearch("");
      return;
    }

    updateForm("name", name);
    updateForm("isCustom", "");
    setExerciseDropdownOpen(false);
    setExerciseSearch("");
  }

  function addExercise() {
    if (!form.name.trim() || !form.sets || !form.reps || !form.weight) {
      Alert.alert("Missing info", "Enter exercise name, sets, reps, and weight.");
      return;
    }

    const exerciseName = form.name.trim();
    const newExercise = {
  id: Date.now(),
  name: exerciseName,
  sets: Number(form.sets),
  reps: Number(form.reps),
  weight: Number(form.weight),
  restSeconds: Number(form.restSeconds || 90),
};
setExercises((current) => {
  if (!workoutStartTime) {
    setWorkoutStartTime(Date.now());
  }

  return [...current, newExercise];
});

    if (form.isCustom === "true" && exerciseName) {
      setSavedExercises((current) => {
        const alreadyExists = current.some((item) => item.toLowerCase() === exerciseName.toLowerCase());
        if (alreadyExists) return current;
        return [...current, exerciseName].sort();
      });
    }

    setForm({
  name: "",
  sets: "",
  reps: "",
  weight: "",
  restSeconds: "90",
  isCustom: "",
});
    setActiveTab("today");
  }

  function removeExercise(id) {
    setExercises((current) => current.filter((exercise) => exercise.id !== id));
  }

function saveCurrentWorkoutAsTemplate() {
  if (exercises.length === 0) {
    Alert.alert("No exercises", "Add exercises before saving a template.");
    return;
  }

  if (!templateName.trim()) {
    Alert.alert("Template name needed", "Enter a template name first.");
    return;
  }

  const newTemplate = {
    id: Date.now(),
    name: templateName.trim(),
    exercises: exercises.map((exercise) => ({
      ...exercise,
      id: Date.now() + Math.random(),
    })),
  };

  setWorkoutTemplates((current) => [newTemplate, ...current]);
  setTemplateName("");

  Alert.alert("Template saved", `${newTemplate.name} has been saved.`);
}

function loadWorkoutTemplate(template) {
  const templateExercises = Array.isArray(template.exercises)
    ? template.exercises
    : [];

  const loadedExercises = templateExercises.map((exercise) => ({
    ...exercise,
    id: Date.now() + Math.random(),
  }));

  setExercises(loadedExercises);
  setCompletedSets({});
  setActiveTimers({});
  setWorkoutStartTime(Date.now());
  setWorkoutDuration(0);
  setActiveTab("today");
}

function deleteWorkoutTemplate(templateId) {
  setWorkoutTemplates((current) =>
    current.filter((template) => template.id !== templateId)
  );
}
  function saveWorkout() {
    if (exercises.length === 0) {
      Alert.alert("No workout", "Add at least one exercise first.");
      return;
    }

    const currentDay = todayKey();
    const newStreak = {
      lastWorkoutDate: currentDay,
      count:
        streak.lastWorkoutDate === currentDay
          ? streak.count
          : streak.lastWorkoutDate === yesterdayKey()
          ? streak.count + 1
          : 1,
    };

    const streakBonus = newStreak.count >= 3 && streak.lastWorkoutDate !== currentDay ? 15 : 0;
    const basePoints = calculateWorkoutPoints(exercises, history);
    const points = basePoints + streakBonus;
    const oldTotalPoints = lifetimePoints;
    const newTotalPoints = lifetimePoints + points;
    const oldAvatar = getAvatarStage(oldTotalPoints);
    const newAvatar = getAvatarStage(newTotalPoints);
    const workoutVolume = totalVolume(exercises);
    const hitGoal = workoutVolume >= dailyGoals.volume;
    const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

    const newWorkout = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      dateKey: currentDay,
      exercises,
      points,
      basePoints,
      streakBonus,
      hitGoal,
      quote: hitGoal ? null : quote,
      levelAfterWorkout: newAvatar.level,
      rankAfterWorkout: newAvatar.title,
    };

    setHistory((current) => [newWorkout, ...current]);
    setLifetimePoints(newTotalPoints);
    setStreak(newStreak);
    setExercises([]);
setCompletedSets({});
setActiveTimers({});
setWorkoutStartTime(null);
setWorkoutDuration(0);
    setActiveTab("avatar");

    if (newAvatar.level > oldAvatar.level) {
      Vibration.vibrate([0, 250, 120, 250]);
      setLevelUpModal({ oldAvatar, newAvatar, points });
      return;
    }

    if (!hitGoal) {
      Alert.alert("Goal missed — keep moving", quote);
      return;
    }

    Alert.alert("Goal crushed", `Strong work. You earned ${points} XP.${streakBonus ? ` Streak bonus: +${streakBonus} XP.` : ""}`);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>RS</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.appLabel}>REPSTACK</Text>
              <Text style={styles.title}>Train. Earn XP. Ascend.</Text>
              <Text style={styles.subtitle}>Log lifts. Build volume. Evolve your legend.</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabBar}>
  <TabButton label="Today" active={activeTab === "today"} onPress={() => setActiveTab("today")} />
  <TabButton label="Add" active={activeTab === "add"} onPress={() => setActiveTab("add")} />
  <TabButton label="Templates" active={activeTab === "templates"} onPress={() => setActiveTab("templates")} />
  <TabButton label="Avatar" active={activeTab === "avatar"} onPress={() => setActiveTab("avatar")} />
  <TabButton label="History" active={activeTab === "history"} onPress={() => setActiveTab("history")} />
</View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {activeTab === "today" && (
            <View>
              <View style={styles.metricGrid}>
                <MetricCard label="Daily Volume" value={`${todayVolume.toLocaleString()} lb`} />
                <MetricCard label="Exercises" value={`${exercises.length}`} />
                <MetricCard label="XP Today" value={`+${todayPoints}`} />
              </View>
              <View style={styles.workoutTimerCard}>
  <Text style={styles.workoutTimerLabel}>Workout Duration</Text>
  <Text style={styles.workoutTimerValue}>
    {formatWorkoutDuration(workoutDuration)}
  </Text>
</View>

              <StreakCard streak={streak} />
              <AvatarCard avatar={avatar} progressToNext={progressToNext} nextAvatar={nextAvatar} totalPoints={totalPoints} />
              <GoalCard dailyGoals={dailyGoals} todayVolume={todayVolume} volumeGoalPercent={volumeGoalPercent} goalHit={goalHit} />
              <VolumeChart history={history} />

              <View style={styles.card}>
                <View style={styles.rowBetween}>
                  <Text style={styles.cardTitle}>Today’s Exercises</Text>
                  <Pressable style={styles.smallButton} onPress={() => setActiveTab("add")}>
                    <Text style={styles.smallButtonText}>+ Add</Text>
                  </Pressable>
                </View>

                {exercises.length === 0 ? (
                  <Text style={styles.emptyText}>No exercises logged yet. Add your first lift.</Text>
                ) : (
                  exercises.map((exercise) => (
                    <View key={exercise.id} style={styles.exerciseItem}>
                      <View style={styles.exerciseTopRow}>
                        <Text style={styles.exerciseName}>{exercise.name}</Text>
                        <Pressable onPress={() => removeExercise(exercise.id)}>
                          <Text style={styles.deleteText}>Remove</Text>
                        </Pressable>
                      </View>
                      <Text style={styles.exerciseDetails}>
                        {exercise.sets} sets × {exercise.reps} reps × {exercise.weight} lb
                      </Text>
                      <Text style={styles.volumeText}>{volumeOf(exercise).toLocaleString()} lb volume</Text>
                      <Pressable
  style={styles.timerButton}
  onPress={() =>
    startRestTimer(exercise.id, exercise.restSeconds)
  }
>
  <Text style={styles.timerButtonText}>
    {activeTimers[exercise.id] > 0
      ? `Rest: ${formatTimer(activeTimers[exercise.id])}`
      : `Start Rest Timer (${exercise.restSeconds || 90}s)`}
  </Text>
</Pressable>
<Text style={styles.setProgressText}>
  Sets Complete: {completedSets[exercise.id] || 0} / {exercise.sets}
</Text>

<Pressable
  style={[
    styles.completeSetButton,
    (completedSets[exercise.id] || 0) >= exercise.sets &&
      styles.completeSetButtonDone,
  ]}
  onPress={() => completeSet(exercise)}
>
  <Text style={styles.completeSetButtonText}>
    {(completedSets[exercise.id] || 0) >= exercise.sets
      ? "All Sets Complete"
      : "Complete Set"}
  </Text>
</Pressable>
                    </View>
                  ))
                )}

                <Pressable style={[styles.primaryButton, exercises.length === 0 && styles.disabledButton]} onPress={saveWorkout}>
                  <Text style={styles.primaryButtonText}>Save Workout</Text>
                </Pressable>
              </View>
            </View>
          )}

          {activeTab === "add" && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Add Exercise</Text>

              <ExerciseDropdown
                exerciseOptions={savedExercises}
                selectedExercise={form.name}
                isCustom={form.isCustom === "true"}
                dropdownOpen={exerciseDropdownOpen}
                setDropdownOpen={setExerciseDropdownOpen}
                onSelectExercise={selectExercise}
                exerciseSearch={exerciseSearch}
                setExerciseSearch={setExerciseSearch}
              />

              {form.isCustom === "true" ? (
                <AppInput label="Custom Exercise Name" placeholder="Enter custom exercise" value={form.name} onChangeText={(value) => updateForm("name", value)} />
              ) : null}

              {suggestion ? <SuggestedLiftCard suggestion={suggestion} /> : null}

              <AppInput label="Sets" placeholder="4" value={form.sets} onChangeText={(value) => updateForm("sets", value)} keyboardType="numeric" />
              <AppInput label="Reps" placeholder="10" value={form.reps} onChangeText={(value) => updateForm("reps", value)} keyboardType="numeric" />
              <AppInput label="Weight" placeholder="185" value={form.weight} onChangeText={(value) => updateForm("weight", value)} keyboardType="numeric" />
              <AppInput
  label="Rest Timer Per Set (seconds)"
  placeholder="90"
  value={form.restSeconds}
  onChangeText={(value) => updateForm("restSeconds", value)}
  keyboardType="numeric"
/>

              <Pressable style={styles.primaryButton} onPress={addExercise}>
                <Text style={styles.primaryButtonText}>Add to Today</Text>
              </Pressable>
            </View>
          )}
{activeTab === "templates" && (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Workout Templates</Text>

    <AppInput
      label="Template Name"
      placeholder="Push Day, Pull Day, Legs..."
      value={templateName}
      onChangeText={setTemplateName}
    />

    <Pressable
      style={styles.primaryButton}
      onPress={saveCurrentWorkoutAsTemplate}
    >
      <Text style={styles.primaryButtonText}>
        Save Current Workout as Template
      </Text>
    </Pressable>

    {workoutTemplates.length === 0 ? (
      <Text style={styles.emptyText}>No templates saved yet.</Text>
    ) : (
      workoutTemplates.map((template) => {
        const templateExercises = Array.isArray(template.exercises)
          ? template.exercises
          : [];

        return (
          <View key={template.id} style={styles.historyItem}>
            <View style={styles.rowBetween}>
              <Text style={styles.historyDate}>{template.name}</Text>

              <Pressable onPress={() => deleteWorkoutTemplate(template.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </Pressable>
            </View>

            <Text style={styles.exerciseDetails}>
              {templateExercises.length} exercises
            </Text>

            <Text style={styles.volumeText}>
              {totalVolume(templateExercises).toLocaleString()} lb planned volume
            </Text>

            <View style={styles.historyExerciseList}>
              {templateExercises.map((exercise) => (
                <View key={exercise.id} style={styles.historyExerciseRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.historyExerciseName}>
                      {exercise.name}
                    </Text>
                    <Text style={styles.historyExerciseDetails}>
                      {exercise.sets} sets × {exercise.reps} reps ×{" "}
                      {exercise.weight} lb
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <Pressable
              style={styles.primaryButton}
              onPress={() => loadWorkoutTemplate(template)}
            >
              <Text style={styles.primaryButtonText}>Load Template</Text>
            </Pressable>
          </View>
        );
      })
    )}
  </View>
)}
          {activeTab === "avatar" && (
            <View>
              <AvatarCard avatar={avatar} progressToNext={progressToNext} nextAvatar={nextAvatar} totalPoints={totalPoints} />
              <VolumeChart history={history} />

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Scoring Rules</Text>
                <Rule label="Complete workout" points="+10" />
                <Rule label="Each exercise logged" points="+2" />
                <Rule label="Beat same exercise volume" points="+10" />
                <Rule label="Beat daily volume record" points="+25" />
                <Rule label="3+ day streak bonus" points="+15" />
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Avatar Levels</Text>
                {avatarStages.map((stage) => {
                  const imageSource = avatarImages[stage.level];
                  const isCurrentLevel = stage.level === avatar.level;

                  return (
                    <View key={stage.level} style={[styles.levelRow, isCurrentLevel && { borderColor: stage.color, backgroundColor: "#111827" }]}>
                      <View style={styles.levelContentRow}>
                        <View style={[styles.levelAvatarBox, { borderColor: stage.color }]}>
                          {imageSource ? (
                            <Image source={imageSource} style={styles.levelAvatarImage} resizeMode="cover" />
                          ) : (
                            <View style={styles.levelAvatarLocked}>
                              <Text style={styles.levelAvatarLockedText}>Locked</Text>
                            </View>
                          )}
                        </View>

                        <View style={{ flex: 1 }}>
                          <Text style={[styles.levelTitle, { color: stage.color }]}>Level {stage.level}: {stage.title}</Text>
                          <Text style={styles.levelSubtext}>{stage.min.toLocaleString()}+ XP · {stage.subtitle}</Text>
                          {isCurrentLevel ? <Text style={styles.currentLevelText}>Current Level</Text> : null}
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {activeTab === "history" && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Workout History</Text>
              {history.map((day) => (
                <View key={day.id} style={styles.historyItem}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.historyDate}>{day.date}</Text>
                    <Text style={styles.historyPoints}>+{day.points} XP</Text>
                  </View>

                  <Text style={styles.exerciseDetails}>{day.exercises.length} exercises</Text>
                  <Text style={styles.volumeText}>{totalVolume(day.exercises).toLocaleString()} lb total volume</Text>

                  {day.streakBonus ? <Text style={styles.historyLevelText}>Streak Bonus: +{day.streakBonus} XP</Text> : null}

                  <View style={styles.historyExerciseList}>
                    {day.exercises.map((exercise) => (
                      <View key={exercise.id} style={styles.historyExerciseRow}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.historyExerciseName}>{exercise.name}</Text>
                          <Text style={styles.historyExerciseDetails}>
                            {exercise.sets} sets × {exercise.reps} reps × {exercise.weight} lb
                          </Text>
                        </View>
                        <Text style={styles.historyExerciseVolume}>{volumeOf(exercise).toLocaleString()} lb</Text>
                      </View>
                    ))}
                  </View>

                  {day.levelAfterWorkout ? (
                    <Text style={styles.historyLevelText}>Reached Level {day.levelAfterWorkout}: {day.rankAfterWorkout}</Text>
                  ) : null}

                  {day.hitGoal === false && day.quote ? (
                    <Text style={styles.quoteText}>“{day.quote}”</Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>

      <LevelUpModal levelUpModal={levelUpModal} onClose={() => setLevelUpModal(null)} />
    </SafeAreaView>
  );
}

function TabButton({ label, active, onPress }) {
  return (
    <Pressable style={[styles.tabButton, active && styles.activeTabButton]} onPress={onPress}>
      <Text style={[styles.tabButtonText, active && styles.activeTabButtonText]}>{label}</Text>
    </Pressable>
  );
}

function MetricCard({ label, value }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function AvatarCard({ avatar, progressToNext, nextAvatar, totalPoints }) {
  return (
    <View style={styles.card}>
      <View style={styles.avatarHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.smallLabel}>Current Avatar</Text>
          <Text style={[styles.avatarTitle, { color: avatar.color }]}>Level {avatar.level}: {avatar.title}</Text>
          <Text style={styles.avatarBuild}>{avatar.subtitle}</Text>
          <Text style={styles.totalPoints}>{totalPoints.toLocaleString()} total XP</Text>
        </View>
        <AvatarFigure level={avatar.level} />
      </View>

      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progressToNext}%`, backgroundColor: avatar.color }]} />
      </View>

      <Text style={styles.progressText}>{nextAvatar ? `${progressToNext}% toward ${nextAvatar.title}` : "Max avatar stage reached"}</Text>
    </View>
  );
}

function AvatarFigure({ level }) {
  const stage = avatarStages.find((item) => item.level === level) || avatarStages[0];
  const imageSource = avatarImages[level];

  return (
    <View style={styles.avatarArtStage}>
      <View style={[styles.avatarArtGlow, { backgroundColor: stage.aura }]} />
      <View style={[styles.avatarArtFrame, { borderColor: stage.color }]}>
        {imageSource ? (
          <Image source={imageSource} style={styles.avatarArtImage} resizeMode="cover" />
        ) : (
          <View style={styles.avatarArtPlaceholder}>
            <Text style={[styles.avatarArtLevel, { color: stage.color }]}>LV {stage.level}</Text>
            <Text style={[styles.avatarArtName, { color: stage.color }]}>{stage.title}</Text>
            <Text style={styles.avatarArtHint}>Locked avatar</Text>
          </View>
        )}
      </View>
    </View>
  );
}

function ExerciseDropdown({
  exerciseOptions,
  selectedExercise,
  isCustom,
  dropdownOpen,
  setDropdownOpen,
  onSelectExercise,
  exerciseSearch,
  setExerciseSearch,
}) {
  const filteredExercises = exerciseOptions.filter((exercise) =>
    exercise.toLowerCase().includes(exerciseSearch.toLowerCase().trim())
  );

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Exercise</Text>
      <Pressable style={styles.dropdownButton} onPress={() => setDropdownOpen(!dropdownOpen)}>
        <Text style={[styles.dropdownButtonText, !selectedExercise && !isCustom && styles.dropdownPlaceholder]}>
          {isCustom ? "Custom Exercise" : selectedExercise || "Select exercise"}
        </Text>
        <Text style={styles.dropdownArrow}>{dropdownOpen ? "▲" : "▼"}</Text>
      </Pressable>

      {dropdownOpen ? (
        <View style={styles.dropdownList}>
          <TextInput
            value={exerciseSearch}
            onChangeText={setExerciseSearch}
            placeholder="Type to search exercises..."
            placeholderTextColor="#71717a"
            style={styles.dropdownSearchInput}
          />

          <ScrollView nestedScrollEnabled style={styles.dropdownScroll}>
            <Pressable style={styles.dropdownItem} onPress={() => onSelectExercise("Custom Exercise")}>
              <Text style={[styles.dropdownItemText, styles.customExerciseText]}>Custom Exercise</Text>
            </Pressable>

            {filteredExercises.length === 0 ? (
              <Text style={styles.dropdownNoResults}>No matches. Use Custom Exercise.</Text>
            ) : (
              filteredExercises.map((exercise) => (
                <Pressable key={exercise} style={styles.dropdownItem} onPress={() => onSelectExercise(exercise)}>
                  <Text style={styles.dropdownItemText}>{exercise}</Text>
                </Pressable>
              ))
            )}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}

function SuggestedLiftCard({ suggestion }) {
  return (
    <View style={styles.suggestionCard}>
      <Text style={styles.suggestionTitle}>Suggested Next Lift</Text>
      <Text style={styles.suggestionText}>
        Last time: {suggestion.previousWeight} lb. Try {suggestion.sets} × {suggestion.reps} at {suggestion.weight} lb.
      </Text>
    </View>
  );
}

function StreakCard({ streak }) {
  return (
    <View style={styles.streakCard}>
      <Text style={styles.streakText}>🔥 Current Streak: {streak.count} day{streak.count === 1 ? "" : "s"}</Text>
      <Text style={styles.streakSubtext}>Train 3+ days in a row to earn +15 XP bonus.</Text>
    </View>
  );
}

function VolumeChart({ history }) {
  const recent = [...history].slice(0, 7).reverse();
  const maxVolume = Math.max(1, ...recent.map((day) => totalVolume(day.exercises)));

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Volume Trend</Text>
      {recent.length === 0 ? (
        <Text style={styles.emptyText}>Save workouts to build your chart.</Text>
      ) : (
        <View style={styles.chartRow}>
          {recent.map((day) => {
            const volume = totalVolume(day.exercises);
            const barHeight = Math.max(8, Math.round((volume / maxVolume) * 90));

            return (
              <View key={day.id} style={styles.chartBarGroup}>
                <View style={styles.chartBarTrack}>
                  <View style={[styles.chartBarFill, { height: barHeight }]} />
                </View>
                <Text style={styles.chartBarLabel}>{volume >= 1000 ? `${Math.round(volume / 1000)}k` : volume}</Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

function GoalCard({ dailyGoals, todayVolume, volumeGoalPercent, goalHit }) {
  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.cardTitle}>Daily Goal</Text>
        <Text style={[styles.goalBadge, goalHit && styles.goalBadgeHit]}>{goalHit ? "Hit" : "In Progress"}</Text>
      </View>

      <Text style={styles.goalText}>Volume Goal: {todayVolume.toLocaleString()} / {dailyGoals.volume.toLocaleString()} lb</Text>

      <View style={styles.goalBarBackground}>
        <View style={[styles.goalBarFill, { width: `${volumeGoalPercent}%` }]} />
      </View>

      {!goalHit ? (
        <Text style={styles.goalHint}>If you save below goal, RepStack gives you a motivational quote instead of shame.</Text>
      ) : (
        <Text style={styles.goalHint}>Goal met. Save this workout and collect your win.</Text>
      )}
    </View>
  );
}

function AppInput({ label, ...props }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput {...props} placeholderTextColor="#71717a" style={styles.input} />
    </View>
  );
}

function Rule({ label, points }) {
  return (
    <View style={styles.ruleRow}>
      <Text style={styles.ruleLabel}>{label}</Text>
      <Text style={styles.rulePoints}>{points}</Text>
    </View>
  );
}

function LevelUpModal({ levelUpModal, onClose }) {
  const pulse = useMemo(() => new Animated.Value(0), []);
  const scale = useMemo(() => new Animated.Value(0.85), []);
  const fade = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    if (!levelUpModal) return;

    fade.setValue(0);
    scale.setValue(0.85);
    pulse.setValue(0);

    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 70,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        })
      ),
    ]).start();
  }, [levelUpModal]);

  if (!levelUpModal) return null;

  return (
    <Modal visible transparent animationType="fade">
      <View style={styles.modalBackdrop}>
        <Animated.View
  style={[
    styles.levelUpBox,
    styles.levelUpAnimatedBox,
    {
      borderColor: levelUpModal.newAvatar.color,
      opacity: fade,
      transform: [{ scale }],
    },
  ]}
>
          <Text style={styles.levelUpText}>LEVEL UP!</Text>
          <Text style={[styles.levelUpRank, { color: levelUpModal.newAvatar.color }]}>{levelUpModal.newAvatar.title}</Text>
          <Text style={styles.levelUpSubtext}>You earned {levelUpModal.points} XP.</Text>
          <Text style={styles.levelUpSubtext}>Old Rank: {levelUpModal.oldAvatar.title}</Text>
          <Pressable style={styles.primaryButton} onPress={onClose}>
            <Text style={styles.primaryButtonText}>Continue</Text>
          </Pressable>
      </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#09090b" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
  loadingContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: { marginBottom: 16, paddingTop: 4 },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  brandMark: { width: 46, height: 46, borderRadius: 14, backgroundColor: "#34d399", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#a7f3d0" },
  brandMarkText: { color: "#022c22", fontSize: 16, fontWeight: "900" },
  appLabel: { color: "#34d399", fontSize: 12, fontWeight: "900", letterSpacing: 4 },
  title: { color: "#f4f4f5", fontSize: 28, fontWeight: "900", marginTop: 3 },
  subtitle: { color: "#a1a1aa", marginTop: 3, fontSize: 14 },
  tabBar: { flexDirection: "row", backgroundColor: "#18181b", borderRadius: 22, padding: 5, marginBottom: 10 },
  tabButton: { flex: 1, paddingVertical: 11, borderRadius: 17, alignItems: "center" },
  activeTabButton: { backgroundColor: "#34d399" },
  tabButtonText: { color: "#a1a1aa", fontWeight: "800", fontSize: 12 },
  activeTabButtonText: { color: "#022c22" },
  setProgressText: {
  color: "#a1a1aa",
  fontWeight: "800",
  marginTop: 10,
},

completeSetButton: {
  backgroundColor: "#052e16",
  borderColor: "#16a34a",
  borderWidth: 1,
  borderRadius: 14,
  paddingVertical: 10,
  alignItems: "center",
  marginTop: 8,
},

completeSetButtonDone: {
  backgroundColor: "#1f2937",
  borderColor: "#374151",
},

completeSetButtonText: {
  color: "#86efac",
  fontWeight: "900",
},
  scrollContent: { paddingBottom: 40 },
  metricGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 10 },
  metricCard: { width: "31.5%", backgroundColor: "#18181b", borderRadius: 22, padding: 14, borderWidth: 1, borderColor: "#27272a" },
  metricLabel: { color: "#a1a1aa", fontSize: 12, fontWeight: "700" },
  metricValue: { color: "#f4f4f5", fontSize: 20, fontWeight: "900", marginTop: 8 },
  card: { backgroundColor: "#18181b", borderRadius: 26, padding: 16, borderWidth: 1, borderColor: "#27272a", marginBottom: 12 },
  cardTitle: { color: "#f4f4f5", fontSize: 22, fontWeight: "900", marginBottom: 12 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 },
  smallButton: { backgroundColor: "#27272a", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 14 },
  smallButtonText: { color: "#34d399", fontWeight: "900" },
  emptyText: { color: "#71717a", textAlign: "center", paddingVertical: 28 },
  workoutTimerCard: {
  backgroundColor: "#18181b",
  borderRadius: 22,
  padding: 16,
  borderWidth: 1,
  borderColor: "#27272a",
  marginBottom: 12,
  alignItems: "center",
},

workoutTimerLabel: {
  color: "#a1a1aa",
  fontWeight: "800",
  marginBottom: 6,
},

workoutTimerValue: {
  color: "#34d399",
  fontSize: 28,
  fontWeight: "900",
},
  exerciseItem: { backgroundColor: "#09090b", borderRadius: 18, padding: 14, marginBottom: 10 },
  exerciseTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  exerciseName: { color: "#f4f4f5", fontSize: 17, fontWeight: "900" },
  deleteText: { color: "#f87171", fontSize: 12, fontWeight: "800" },
  exerciseDetails: { color: "#a1a1aa", marginTop: 5 },
  volumeText: { color: "#34d399", fontWeight: "900", marginTop: 8 },
  primaryButton: { backgroundColor: "#34d399", borderRadius: 18, paddingVertical: 15, alignItems: "center", marginTop: 12, paddingHorizontal: 18 },
  disabledButton: { opacity: 0.45 },
  primaryButtonText: { color: "#022c22", fontWeight: "900", fontSize: 16 },
  avatarHeader: { flexDirection: "row", alignItems: "center" },
  smallLabel: { color: "#a1a1aa", fontSize: 12, fontWeight: "800", textTransform: "uppercase" },
  avatarTitle: { fontSize: 24, fontWeight: "900", marginTop: 4 },
  avatarBuild: { color: "#a1a1aa", marginTop: 4 },
  totalPoints: { color: "#34d399", fontWeight: "900", marginTop: 8 },
  avatarArtStage: { width: 155, height: 190, alignItems: "center", justifyContent: "center", marginLeft: 12, position: "relative" },
  avatarArtGlow: { position: "absolute", width: 135, height: 135, borderRadius: 68, opacity: 0.24 },
  avatarArtFrame: { width: 132, height: 178, borderRadius: 22, backgroundColor: "#020617", borderWidth: 2, overflow: "hidden", alignItems: "center", justifyContent: "center" },
  avatarArtImage: { width: "100%", height: "100%" },
  avatarArtPlaceholder: { alignItems: "center", justifyContent: "center", paddingHorizontal: 8 },
  avatarArtLevel: { fontSize: 13, fontWeight: "900", letterSpacing: 1 },
  avatarArtName: { fontSize: 15, fontWeight: "900", textAlign: "center", marginTop: 8 },
  avatarArtHint: { color: "#71717a", fontSize: 10, marginTop: 8, textAlign: "center" },
  progressBarBackground: { height: 14, backgroundColor: "#27272a", borderRadius: 99, overflow: "hidden", marginTop: 16 },
  progressBarFill: { height: "100%", borderRadius: 99 },
  progressText: { color: "#a1a1aa", marginTop: 8, fontSize: 12, fontWeight: "700" },
  inputGroup: { marginBottom: 12 },
  inputLabel: { color: "#a1a1aa", fontWeight: "800", marginBottom: 7 },
  input: { backgroundColor: "#09090b", color: "#f4f4f5", borderColor: "#27272a", borderWidth: 1, borderRadius: 18, paddingHorizontal: 14, paddingVertical: 13, fontSize: 16 },
  dropdownButton: { backgroundColor: "#09090b", borderColor: "#27272a", borderWidth: 1, borderRadius: 18, paddingHorizontal: 14, paddingVertical: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  dropdownButtonText: { color: "#f4f4f5", fontSize: 16, fontWeight: "800" },
  dropdownPlaceholder: { color: "#71717a" },
  dropdownArrow: { color: "#34d399", fontSize: 12, fontWeight: "900" },
  dropdownList: { marginTop: 8, backgroundColor: "#09090b", borderColor: "#27272a", borderWidth: 1, borderRadius: 18, overflow: "hidden", maxHeight: 380 },
  dropdownScroll: { maxHeight: 300 },
  dropdownSearchInput: { backgroundColor: "#18181b", color: "#f4f4f5", paddingHorizontal: 14, paddingVertical: 13, fontSize: 16, borderBottomWidth: 1, borderBottomColor: "#27272a" },
  dropdownItem: { paddingHorizontal: 14, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: "#18181b" },
  dropdownItemText: { color: "#f4f4f5", fontWeight: "700" },
  customExerciseText: { color: "#34d399", fontWeight: "900" },
  dropdownNoResults: { color: "#71717a", padding: 14, fontWeight: "800", textAlign: "center" },
  suggestionCard: { backgroundColor: "#052e16", borderColor: "#16a34a", borderWidth: 1, borderRadius: 18, padding: 12, marginBottom: 12 },
  suggestionTitle: { color: "#86efac", fontWeight: "900", marginBottom: 4 },
  suggestionText: { color: "#dcfce7", fontWeight: "700", lineHeight: 20 },
  streakCard: { backgroundColor: "#1c1917", borderColor: "#fb923c", borderWidth: 1, borderRadius: 22, padding: 14, marginBottom: 12 },
  streakText: { color: "#fed7aa", fontWeight: "900", fontSize: 16 },
  streakSubtext: { color: "#a1a1aa", marginTop: 4, fontSize: 12 },
  chartRow: { height: 130, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-around", gap: 8 },
  chartBarGroup: { flex: 1, alignItems: "center", justifyContent: "flex-end" },
  chartBarTrack: { height: 96, width: 22, backgroundColor: "#09090b", borderRadius: 10, justifyContent: "flex-end", overflow: "hidden" },
  chartBarFill: { width: "100%", backgroundColor: "#34d399", borderRadius: 10 },
  chartBarLabel: { color: "#a1a1aa", fontSize: 10, marginTop: 6, fontWeight: "800" },
  ruleRow: { flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#27272a", paddingVertical: 12 },
  ruleLabel: { color: "#f4f4f5", fontWeight: "700" },
  rulePoints: { color: "#34d399", fontWeight: "900" },
  levelRow: { borderWidth: 1, borderColor: "#27272a", borderRadius: 16, padding: 10, marginBottom: 10 },
  levelContentRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  levelAvatarBox: { width: 54, height: 76, borderRadius: 12, overflow: "hidden", borderWidth: 1, backgroundColor: "#020617" },
  levelAvatarImage: { width: "100%", height: "100%" },
  levelAvatarLocked: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#09090b" },
  levelAvatarLockedText: { color: "#71717a", fontSize: 10, fontWeight: "800" },
  currentLevelText: { color: "#34d399", fontSize: 12, fontWeight: "900", marginTop: 4 },
  levelTitle: { fontSize: 16, fontWeight: "900" },
  levelSubtext: { color: "#a1a1aa", marginTop: 2 },
  historyItem: { backgroundColor: "#09090b", borderRadius: 18, padding: 14, marginBottom: 10 },
  historyDate: { color: "#f4f4f5", fontSize: 17, fontWeight: "900" },
  historyPoints: { color: "#34d399", fontWeight: "900" },
  historyLevelText: { color: "#c084fc", marginTop: 8, fontWeight: "900" },
  historyExerciseList: { marginTop: 12, gap: 8 },
  historyExerciseRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#18181b", borderRadius: 14, padding: 10, borderWidth: 1, borderColor: "#27272a" },
  historyExerciseName: { color: "#f4f4f5", fontWeight: "900", fontSize: 14 },
  historyExerciseDetails: { color: "#a1a1aa", marginTop: 3, fontSize: 12 },
  timerButton: {
  backgroundColor: "#27272a",
  borderRadius: 14,
  paddingVertical: 10,
  alignItems: "center",
  marginTop: 10,
},
levelUpAnimatedBox: {
  alignItems: "center",
  width: "100%",
},
timerButtonText: {
  color: "#34d399",
  fontWeight: "900",
},
  historyExerciseVolume: { color: "#34d399", fontWeight: "900", marginLeft: 10 },
  quoteText: { color: "#fbbf24", marginTop: 10, fontWeight: "800", lineHeight: 20 },
  goalBadge: { color: "#fbbf24", backgroundColor: "#451a03", overflow: "hidden", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, fontWeight: "900", fontSize: 12 },
  goalBadgeHit: { color: "#022c22", backgroundColor: "#34d399" },
  goalText: { color: "#f4f4f5", fontWeight: "800", marginTop: 10 },
  goalBarBackground: { height: 12, backgroundColor: "#27272a", borderRadius: 99, overflow: "hidden", marginTop: 8 },
  goalBarFill: { height: "100%", backgroundColor: "#34d399", borderRadius: 99 },
  goalHint: { color: "#a1a1aa", marginTop: 12, fontSize: 12, lineHeight: 18 },
  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.82)", alignItems: "center", justifyContent: "center", padding: 24 },
  levelUpBox: { backgroundColor: "#18181b", borderRadius: 28, padding: 24, borderWidth: 2, alignItems: "center", width: "100%" },
  levelUpText: { color: "#f4f4f5", fontSize: 34, fontWeight: "900", letterSpacing: 2 },
  levelUpRank: { fontSize: 28, fontWeight: "900", marginTop: 10 },
  levelUpSubtext: { color: "#a1a1aa", fontWeight: "800", marginTop: 8 },
});
