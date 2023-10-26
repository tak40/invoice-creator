# Invoice Creator: Sccrimba Bootcamp Solo Project

## Table of Contents
- [Overview](#overview)
- [Requirements](#requirements)
    - [Initial Requirements](#initial-requirements)
    - [Stretch Goals](#stretch-goals)
- [Design Mockups](#design-mockups)
- [Initial Development Focus and Goals](#initial-development-focus-and-goals)
- [Key Learnings from Initial Version](#key-learnings-from-initial-version)
- [Refactoring Journey](#refactoring-journey)
- [What Led to Refactoring](#what-led-to-refactoring)
- [Strategy and Steps](#strategy-and-steps)
- [Challenges Faced](#challenges-faced)
- [Learnings from Refactoring](#learnings-from-refactoring)
- [Comparing Initial Goals to What Was Achieved](#comparing-initial-goals-to-what-was-achieved)


## Overview

This project is a solo project from the Scrimba bootcamp, made entirely from scratch. Its primary purpose is to enable users to generate invoices swiftly. Emphasis has been laid on the usage of vanilla JavaScript, HTML, and CSS, providing a clean and straightforward web application experience.


## Requirements

### Initial Requirements
- Array to hold requested tasks
- Buttons to add a task to array
- Display data from array; should update when the array changes
- Charge only once for each task
- Update total amount each time a task gets added
- Button to "send invoice" (reset)

### Stretch Goals
- Enter tasks
- Text field for task
- Select menu with cost options
- Add new task and cost to the array and update task list
- Remove tasks


## Design Mockups
You can view the design mockups for this project on Figma using the following link:  
[Invoice Creator Design Mockups on Figma](https://www.figma.com/file/ejHmm5h6VhSW7dQgRgOmlk/Invoice-Creator?node-id=0%3A1&t=nxSAEKc5XGTtzEmR-1)


## Initial Development Focus and Goals

During the initial stages of development, my primary focus was navigating through the foundational requirements. Implementing the logic using JavaScript proved to be quite challenging. Given the intricacies of the requirements, I found myself going back and forth, often iterating and refining my approach.

While I aspired to achieve the stretch goals, the complexity of the basic requirements necessitated most of my attention and time. My efforts were primarily concentrated on understanding the intricacies of JavaScript and how to best apply them to meet the project's specifications.

It was a continuous learning journey, where I constantly found opportunities to better my understanding of the language and its application in web development.

## Key Learnings from Initial Version

### Setting the Goals:
After spending a few months reflecting on the initial version, I was naturally inclined to achieve all the stretch goals. However, beyond just accomplishing these goals, I realized that my code, despite being functional, was convoluted. This motivated me to not only achieve the additional features but also to enhance the codebase's readability and organization.

### Refactoring:
The primary challenge was breaking down the existing code and refactoring it. I wanted to transition from a working mess to a clean, readable, and maintainable codebase.

### Design Inspiration:
While redesigning the app's interface, I took inspiration from popular web applications. Notably, I was influenced by the DoorDash app's design, specifically their quantity changer with '-' and '+' signs. A unique touch I added was the transformation of the '-' icon to a trash can when the quantity reached one. Furthermore, I revamped the color scheme to create a more intuitive user experience.

### Enhancements:
Beyond the initial requirements, I introduced features allowing users to input any task, quantity, and price. This move transformed the app from a static list manager to a dynamic task and invoice generator.

### Implementing Modals:
As I neared the completion of these updates, I had the opportunity to attend a workshop at Scrimba's bootcamp, focusing on implementing modals using the `<dialog>` tag. This knowledge was immediately integrated into the project, adding another layer of sophistication to the user experience.

### Beyond the Stretch Goals:
My journey with this project taught me the essence of continuous learning and iterative development. I realized that the bounds of a project aren't just defined by its goals, but by one's vision and ambition. The challenge was not just to meet the stretch goals but to elevate this bootcamp project to match the standards of a production-grade web application.



Quick start:

```
$ npm install
$ npm start
````

Head over to https://vitejs.dev/ to learn more about using vite
## About Scrimba

At Scrimba our goal is to create the best possible coding school at the cost of a gym membership! 💜
If we succeed with this, it will give anyone who wants to become a software developer a realistic shot at succeeding, regardless of where they live and the size of their wallets 🎉
The Frontend Developer Career Path aims to teach you everything you need to become a Junior Developer, or you could take a deep-dive with one of our advanced courses 🚀

- [Our courses](https://scrimba.com/allcourses)
- [The Frontend Career Path](https://scrimba.com/learn/frontend)
- [Become a Scrimba Pro member](https://scrimba.com/pricing)

Happy Coding!
