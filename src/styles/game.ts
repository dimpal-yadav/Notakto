import { StyleSheet } from "react-native";
export 
const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  economyInfo: {
    alignItems: 'flex-end',
  },
  economyText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 20,
    textAlign: 'center',
  },
  boardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  footer: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  footerText:{
    fontSize: 18,
    color: 'white'
  },
  menuButton: {
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#8E44AD',
  },
  menuButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  overlayBackground: {
    flex: 1,
  },
  menuPanel: {
    margin: 20,
    borderRadius: 20,
    padding: 16,
  },
  menuContent: {
    paddingHorizontal: 8,
    gap: 12,
  },
  disabledButton: {
    opacity: 0.6,
  },
});