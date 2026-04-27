# Useless Facts App

A tiny, clean app that fetches and displays random useless facts from the Useless Facts API.

## Preview

!![Useless Facts App Screenshot](screenshot.png)

## Features

- **Display Random Facts**: Show facts in a clean card layout
- **Fetch New Facts**: Click a button to load and display a new random fact
- **Auto-load on Start**: Automatically fetch a fact when the app first opens

## How It Works

- Built with vanilla JavaScript, HTML, and CSS
- Uses the [Useless Facts API](https://uselessfacts.jsph.pl/) (no authentication required)
- Clean, minimal design with smooth animations

## Files

- `index.html` - HTML markup structure
- `styles.css` - Custom styling and animations
- `script.js` - JavaScript logic for fetching and displaying facts

## API Integration

The app fetches random facts from: `https://uselessFacts.jsph.pl/random.json?language=en`

Each fact includes:
- `id` - Unique identifier
- `text` - The useless fact
- `source` - Source name
- `source_url` - Link to the source