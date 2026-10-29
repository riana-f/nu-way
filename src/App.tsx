import { useState, useRef, useEffect } from "react";

// ─── Minor Database ────────────────────────────────────────────────────────
const NU_MINORS = [
  // ── Khoury College of Computer Sciences ──────────────────────────────────
  { id: "cs", name: "Computer Science", college: "Khoury", totalCredits: 20, requirements: [{ code: "CS 1800", name: "Discrete Structures", credits: 4 }, { code: "CS 2500", name: "Fundamentals of CS 1", credits: 4 }, { code: "CS 2510", name: "Fundamentals of CS 2", credits: 4 }, { code: "CS 3000", name: "Algorithms & Data", credits: 4 }, { code: "CS 3500", name: "Object-Oriented Design", credits: 4 }] },
  { id: "data-science", name: "Data Science", college: "Khoury", totalCredits: 20, requirements: [{ code: "DS 2000", name: "Programming with Data", credits: 4 }, { code: "DS 2001", name: "Programming with Data Practicum", credits: 1 }, { code: "DS 3000", name: "Foundations of Data Science", credits: 4 }, { code: "DS 4200", name: "Information Presentation & Visualization", credits: 4 }, { code: "CS 2500", name: "Fundamentals of CS 1", credits: 4 }, { code: "MATH 2280", name: "Statistics & Software", credits: 3 }] },
  { id: "cybersecurity", name: "Cybersecurity", college: "Khoury", totalCredits: 20, requirements: [{ code: "CS 2500", name: "Fundamentals of CS 1", credits: 4 }, { code: "CS 3700", name: "Networks & Distributed Systems", credits: 4 }, { code: "CY 2550", name: "Foundations of Cybersecurity", credits: 4 }, { code: "CY 3740", name: "Systems Security", credits: 4 }, { code: "CY 4740", name: "Network Security", credits: 4 }] },
  { id: "ai", name: "Artificial Intelligence", college: "Khoury", totalCredits: 20, requirements: [{ code: "CS 2500", name: "Fundamentals of CS 1", credits: 4 }, { code: "CS 2510", name: "Fundamentals of CS 2", credits: 4 }, { code: "CS 4100", name: "Artificial Intelligence", credits: 4 }, { code: "CS 4120", name: "Natural Language Processing", credits: 4 }, { code: "DS 3000", name: "Foundations of Data Science", credits: 4 }] },
  { id: "hci", name: "Human-Computer Interaction", college: "Khoury", totalCredits: 20, requirements: [{ code: "CS 2500", name: "Fundamentals of CS 1", credits: 4 }, { code: "IS 2000", name: "Principles of Information Science", credits: 4 }, { code: "IS 4300", name: "Human-Computer Interaction", credits: 4 }, { code: "IS 4800", name: "Empirical Research Methods", credits: 4 }, { code: "CS 3500", name: "Object-Oriented Design", credits: 4 }] },
  { id: "health-informatics", name: "Health Informatics", college: "Khoury", totalCredits: 20, requirements: [{ code: "IS 2000", name: "Principles of Information Science", credits: 4 }, { code: "IS 3500", name: "Information Systems and Organizations", credits: 4 }, { code: "HLTH 1101", name: "Introduction to Public Health", credits: 4 }, { code: "IS 4150", name: "Health Informatics", credits: 4 }, { code: "DS 3000", name: "Foundations of Data Science", credits: 4 }] },

  // ── College of Science ───────────────────────────────────────────────────
  // Source: 2025-2026 catalog.northeastern.edu
  { id: "astrophysics", name: "Astrophysics", college: "COS", totalCredits: 22, requirements: [{ code: "PHYS 1111", name: "Introduction to Astronomy", credits: 4 }, { code: "PHYS 1151", name: "Physics for Engineering 1", credits: 4 }, { code: "PHYS 1155", name: "Physics for Engineering 2", credits: 4 }, { code: "PHYS 2303", name: "Modern Physics", credits: 4 }, { code: "PHYS 3111", name: "Astrophysical Processes: Decoding the Universe", credits: 4 }, { code: "PHYS 4111", name: "Multimessenger Astrophysics", credits: 4 }] },
  { id: "behavioral-neuro", name: "Behavioral Neuroscience", college: "COS", totalCredits: 20, requirements: [{ code: "BIOL 3405", name: "Neurobiology", credits: 4 }, { code: "PSYC 3200", name: "Clinical Neuroanatomy", credits: 4 }, { code: "PSYC 3458", name: "Biological Psychology", credits: 4 }, { code: "BIOL 3601", name: "Neural Systems and Behavior", credits: 4 }, { code: "PSYC 4512", name: "Neuropsychology", credits: 4 }] },
  { id: "biochemistry", name: "Biochemistry", college: "COS", totalCredits: 20, requirements: [{ code: "BIOL 3611", name: "Biochemistry", credits: 4 }, { code: "BIOL 3612", name: "Lab for Biochemistry", credits: 1 }, { code: "BIOL 4707", name: "Cell and Molecular Biology", credits: 4 }, { code: "CHEM 5620", name: "Protein Chemistry", credits: 3 }, { code: "BIOL 3421", name: "Microbiology", credits: 4 }, { code: "BIOL 3405", name: "Neurobiology", credits: 4 }] },
  { id: "biology", name: "Biology", college: "COS", totalCredits: 22, requirements: [{ code: "BIOL 1107", name: "Foundations of Biology", credits: 4 }, { code: "BIOL 1108", name: "Lab for Foundations of Biology", credits: 1 }, { code: "BIOL 2299", name: "Inquiries in Biological Sciences", credits: 4 }, { code: "BIOL 2301", name: "Genetics and Molecular Biology", credits: 4 }, { code: "BIOL 2302", name: "Lab for Genetics", credits: 1 }, { code: "BIOL 3413", name: "Current Topics in Organismal Biology", credits: 4 }, { code: "BIOL 3409", name: "Current Topics in Biology", credits: 4 }] },
  { id: "cell-mol-bio", name: "Cell and Molecular Biology", college: "COS", totalCredits: 22, requirements: [{ code: "BIOL 1107", name: "Foundations of Biology", credits: 4 }, { code: "BIOL 1108", name: "Lab for Foundations of Biology", credits: 1 }, { code: "BIOL 2301", name: "Genetics and Molecular Biology", credits: 4 }, { code: "BIOL 2302", name: "Lab for Genetics", credits: 1 }, { code: "BIOL 4707", name: "Cell and Molecular Biology", credits: 4 }, { code: "BIOL 3411", name: "Current Topics in Cell and Molecular Biology", credits: 4 }, { code: "BIOL 3421", name: "Microbiology", credits: 4 }] },
  { id: "chemistry", name: "Chemistry", college: "COS", totalCredits: 24, requirements: [{ code: "CHEM 1161", name: "General Chemistry for Science Majors", credits: 4 }, { code: "CHEM 2311", name: "Organic Chemistry 1", credits: 4 }, { code: "CHEM 2312", name: "Lab for Organic Chemistry 1", credits: 1 }, { code: "CHEM 2313", name: "Organic Chemistry 2", credits: 4 }, { code: "CHEM 2314", name: "Lab for Organic Chemistry 2", credits: 1 }, { code: "CHEM 2321", name: "Analytical Chemistry", credits: 4 }, { code: "CHEM 3431", name: "Physical Chemistry", credits: 4 }] },
  { id: "ecology-evo", name: "Ecology and Evolutionary Biology", college: "COS", totalCredits: 26, requirements: [{ code: "EEMB 1101", name: "Foundations in Ecology and Evolutionary Biology", credits: 4 }, { code: "EEMB 1102", name: "Lab for EEMB 1101", credits: 1 }, { code: "EEMB 1105", name: "Foundations in Ecological and Evolutionary Genomics", credits: 4 }, { code: "EEMB 1106", name: "Lab for EEMB 1105", credits: 1 }, { code: "EEMB 2302", name: "Ecology", credits: 4 }, { code: "EEMB 2400", name: "Introduction to Evolution", credits: 4 }, { code: "EEMB 3460", name: "Conservation Biology", credits: 4 }] },
  { id: "env-chem", name: "Environmental Chemistry", college: "COS", totalCredits: 21, requirements: [{ code: "ENVR 3410", name: "Environmental Geochemistry", credits: 4 }, { code: "CHEM 2321", name: "Analytical Chemistry", credits: 4 }, { code: "CHEM 2322", name: "Lab for Analytical Chemistry", credits: 1 }, { code: "CHEM 4901", name: "Undergraduate Research", credits: 4 }, { code: "CIVE 3435", name: "Environmental Pollution: Fate and Transport", credits: 4 }, { code: "ENVR 4504", name: "Environmental Pollution", credits: 4 }] },
  { id: "env-sustain", name: "Environmental and Sustainability Sciences", college: "COS", totalCredits: 24, requirements: [{ code: "ENVR 1400", name: "Foundations in Environmental and Sustainability Sciences", credits: 4 }, { code: "ENVR 1401", name: "Lab for ENVR 1400", credits: 1 }, { code: "ENVR 1200", name: "Dynamic Earth", credits: 4 }, { code: "EEMB 2302", name: "Ecology", credits: 4 }, { code: "ENVR 3150", name: "Food Security and Sustainability", credits: 4 }, { code: "ENVR 5350", name: "Sustainable Energy and Climate Solutions", credits: 4 }, { code: "POLS 2395", name: "Environmental Politics and Policy", credits: 4 }] },
  { id: "env-studies", name: "Environmental Studies", college: "COS", totalCredits: 16, requirements: [{ code: "ENVR 1101", name: "Environmental Science", credits: 4 }, { code: "SOCL 1246", name: "Environment and Society", credits: 4 }, { code: "ENVR 1110", name: "Global Climate Change", credits: 4 }, { code: "ENVR 2515", name: "Sustainable Development", credits: 4 }] },
  { id: "geosciences", name: "Geosciences", college: "COS", totalCredits: 26, requirements: [{ code: "ENVR 1200", name: "Dynamic Earth", credits: 4 }, { code: "ENVR 1201", name: "Lab for ENVR 1200", credits: 1 }, { code: "ENVR 2200", name: "Earth's Changing Cycles", credits: 4 }, { code: "ENVR 2310", name: "Earth Materials", credits: 4 }, { code: "ENVR 2311", name: "Lab for Earth Materials", credits: 1 }, { code: "ENVR 3300", name: "Geographic Information Systems", credits: 4 }, { code: "ENVR 3200", name: "Water Resources", credits: 4 }] },
  { id: "linguistics", name: "Linguistics", college: "COS", totalCredits: 20, requirements: [{ code: "LING 1150", name: "Introduction to Linguistics", credits: 4 }, { code: "LING 2350", name: "Linguistic Analysis", credits: 4 }, { code: "LING 3150", name: "Field Linguistics", credits: 4 }, { code: "LING 3412", name: "Language and Culture", credits: 4 }, { code: "LING 3250", name: "Discourse Analysis", credits: 4 }] },
  { id: "marine-sciences", name: "Marine Sciences", college: "COS", totalCredits: 22, requirements: [{ code: "EEMB 1101", name: "Foundations in Ecology and Evolutionary Biology", credits: 4 }, { code: "EEMB 1102", name: "Lab for EEMB 1101", credits: 1 }, { code: "ENVR 3600", name: "Oceanography", credits: 4 }, { code: "ENVR 2500", name: "Biostatistics", credits: 4 }, { code: "EEMB 2700", name: "Marine Biology", credits: 4 }, { code: "EEMB 5510", name: "New England Marine Biomes", credits: 4 }] },
  { id: "math", name: "Mathematics", college: "COS", totalCredits: 24, requirements: [{ code: "MATH 1341", name: "Calculus 1 for Science and Engineering", credits: 4, alts: ["MATH 1251"] }, { code: "MATH 1342", name: "Calculus 2 for Science and Engineering", credits: 4, alts: ["MATH 1252"] }, { code: "Elective", name: "Intermediate math (choose 2 of 3)", credits: 4, alts: ["MATH 2321", "MATH 2341", "MATH 2331"] }, { code: "Elective", name: "Intermediate math (choose 2 of 3)", credits: 4, alts: ["MATH 2321", "MATH 2341", "MATH 2331"] }, { code: "Elective", name: "Math elective, MATH 3001–4699 (choose 2)", credits: 4, alts: ["MATH 3001-4699"] }, { code: "Elective", name: "Math elective, MATH 3001–4699 (choose 2)", credits: 4, alts: ["MATH 3001-4699"] }] },
  { id: "network-sci", name: "Network Science", college: "COS", totalCredits: 20, requirements: [{ code: "PHYS 1125", name: "Introduction to Network Science", credits: 4 }, { code: "MATH 3545", name: "Introduction to Graph Theory", credits: 4 }, { code: "CS 2000", name: "Introduction to Program Design", credits: 4 }, { code: "CS 2001", name: "Lab for CS 2000", credits: 1 }, { code: "INSH 5304", name: "Social Network Analysis", credits: 4 }] },
  { id: "physics", name: "Physics", college: "COS", totalCredits: 22, requirements: [{ code: "PHYS 1151", name: "Physics for Engineering 1", credits: 4 }, { code: "PHYS 1152", name: "Lab for Physics 1", credits: 1 }, { code: "PHYS 1155", name: "Physics for Engineering 2", credits: 4 }, { code: "PHYS 1156", name: "Lab for Physics 2", credits: 1 }, { code: "PHYS 2303", name: "Modern Physics", credits: 4 }, { code: "PHYS 3302", name: "Electricity and Magnetism", credits: 4 }, { code: "PHYS 3600", name: "Theoretical Mechanics", credits: 4 }] },
  { id: "psychology-cos", name: "Psychology", college: "COS", totalCredits: 20, requirements: [{ code: "PSYC 1101", name: "Foundations of Psychology", credits: 4 }, { code: "PSYC 3402", name: "Social Psychology", credits: 4 }, { code: "PSYC 3458", name: "Biological Psychology", credits: 4 }, { code: "PSYC 3466", name: "Cognition", credits: 4 }, { code: "PSYC 3404", name: "Developmental Psychology", credits: 4 }] },

  { id: "sci-writing", name: "Science Writing", college: "COS", totalCredits: 20, requirements: [{ code: "BIOL 1111", name: "Introductory science course (choose 1)", credits: 4, alts: ["BIOL 1107", "CHEM 1151", "CHEM 1161", "CHEM 1214", "EEMB 1101", "ENVR 1400", "MATH 1242", "MATH 1342", "PHYS 1155", "PHYS 1165", "PHYS 1175", "PSYC 1101"] }, { code: "Elective", name: "Intermediate/advanced science course (choose 1)", credits: 4, alts: ["BIOL 2301-5999", "CHEM 2311-5999", "EEMB 2400-5999", "ENVR 2310-5999", "MATH 2280-5999", "PHYS 2303-5999", "PSYC 2290-5999"] }, { code: "COMM 1125", name: "Science, Communication, and Society (or ENGL 2650)", credits: 4, alts: ["ENGL 2650"] }, { code: "Elective", name: "Science writing elective (choose 2 of 7)", credits: 4, alts: ["COMM 3500", "ENGL 2620", "ENGL 2780", "ENGL 3340", "ENGL 3700", "JRNL 3650", "JRNL 3700"] }, { code: "Elective", name: "Science writing elective (choose 2 of 7)", credits: 4, alts: ["COMM 3500", "ENGL 2620", "ENGL 2780", "ENGL 3340", "ENGL 3700", "JRNL 3650", "JRNL 3700"] }] },
  { id: "bioethics", name: "Bioethics", college: "COS", totalCredits: 22, restrictedMajors: ["biology"], requirements: [{ code: "BIOL 1111", name: "General Biology 1 (with BIOL 1112 lab)", credits: 5 }, { code: "BIOL 2301", name: "Genetics and Molecular Biology (with BIOL 2302 lab)", credits: 5 }, { code: "BIOL 2329", name: "Bioethics", credits: 4 }, { code: "Elective", name: "Intermediate biological ethics (choose 1 of 4)", credits: 4, alts: ["BIOL 3419", "BIOL 3423", "NRSG 2150", "PHIL 3065"] }, { code: "Elective", name: "Biological or general ethics elective (choose 1)", credits: 4, alts: ["BIOL 3419", "BIOL 3423", "NRSG 2150", "PHIL 3065", "INSH 1300", "INSH 2300", "PHIL 1102", "PHIL 1145", "PHIL 1165", "PHIL 1180", "PHIL 1185", "PHIL 1195"] }] },

  // ── D'Amore-McKim School of Business (all 17) ─────────────────────────
  { id: "acct-advisory", name: "Accounting and Advisory Services", college: "D'Amore-McKim", totalCredits: 16, requirements: [{ code: "ACCT 1201", name: "Financial Accounting and Reporting", credits: 4 }, { code: "ACCT 2301", name: "Profit Analysis for Managers", credits: 4 }, { code: "ACCT 3301", name: "Financial Reporting and Analysis", credits: 4 }, { code: "ACCT 3302", name: "Auditing and Advisory Services", credits: 4 }] },
  { id: "brand-mgmt", name: "Brand Management", college: "D'Amore-McKim", totalCredits: 16, requirements: [{ code: "MKTG 2201", name: "Introduction to Marketing", credits: 4 }, { code: "MKTG 3301", name: "Brand Management", credits: 4 }, { code: "MKTG 3303", name: "Consumer Behavior", credits: 4 }, { code: "MKTG 4504", name: "Strategic Brand Communications", credits: 4 }] },
  { id: "business-admin", name: "Business Administration", college: "D'Amore-McKim", totalCredits: 20, requirements: [{ code: "ACCT 1201", name: "Financial Accounting and Reporting", credits: 4 }, { code: "FINA 2201", name: "Financial Management", credits: 4 }, { code: "MKTG 2201", name: "Introduction to Marketing", credits: 4 }, { code: "MGSC 2301", name: "Business Statistics", credits: 4 }, { code: "ORGB 3201", name: "Organizational Behavior", credits: 4 }] },
  { id: "biz-analytics", name: "Business Analytics", college: "D'Amore-McKim", totalCredits: 16, requirements: [{ code: "MGSC 2301", name: "Business Statistics", credits: 4 }, { code: "MISM 2301", name: "Intro to Information Systems", credits: 4 }, { code: "MGSC 3301", name: "Prescriptive Analytics", credits: 4 }, { code: "MGSC 4301", name: "Machine Learning for Business", credits: 4 }] },
  { id: "consulting", name: "Consulting", college: "D'Amore-McKim", totalCredits: 16, requirements: [{ code: "MGMT 3302", name: "Foundations of Consulting", credits: 4 }, { code: "STRT 3501", name: "Strategic Analysis", credits: 4 }, { code: "ORGB 3201", name: "Organizational Behavior", credits: 4 }, { code: "MGMT 4410", name: "Consulting Practicum", credits: 4 }] },
  { id: "corp-innovation", name: "Corporate Innovation", college: "D'Amore-McKim", totalCredits: 12, requirements: [{ code: "INNO 2301", name: "Foundations of Innovation", credits: 4 }, { code: "INNO 3302", name: "Innovation Management", credits: 4 }, { code: "INNO 3303", name: "Innovation Lab", credits: 4 }] },
  { id: "emerging-markets", name: "Emerging Markets", college: "D'Amore-McKim", totalCredits: 16, requirements: [{ code: "INTB 1203", name: "International Business and Global Social Responsibility", credits: 4 }, { code: "INTB 3302", name: "Emerging Markets Strategy", credits: 4 }, { code: "INTB 3401", name: "Global Business Environment", credits: 4 }, { code: "INTB 4302", name: "Doing Business in Emerging Markets", credits: 4 }] },
  { id: "entr-startups", name: "Entrepreneurial Startups", college: "D'Amore-McKim", totalCredits: 16, requirements: [{ code: "ENTR 2301", name: "Entrepreneurship and New Ventures", credits: 4 }, { code: "ENTR 3301", name: "New Venture Creation", credits: 4 }, { code: "FINA 2201", name: "Financial Management", credits: 4 }, { code: "ENTR 4302", name: "Startup Practicum", credits: 4 }] },
  { id: "interdis-ai", name: "Interdisciplinary Artificial Intelligence", college: "D'Amore-McKim", totalCredits: 16, requirements: [{ code: "MISM 2301", name: "Intro to Information Systems", credits: 4 }, { code: "MGSC 4301", name: "Machine Learning for Business", credits: 4 }, { code: "INNO 3302", name: "Innovation Management", credits: 4 }, { code: "MISM 4301", name: "AI Strategy and Implementation", credits: 4 }] },
  { id: "mis", name: "Management Information Systems", college: "D'Amore-McKim", totalCredits: 16, requirements: [{ code: "MISM 2301", name: "Intro to Information Systems and Digital Technologies", credits: 4 }, { code: "MISM 3301", name: "Database Management", credits: 4 }, { code: "MISM 3302", name: "Systems Analysis and Design", credits: 4 }, { code: "MISM 4302", name: "Digital Transformation Strategy", credits: 4 }] },
  { id: "human-capital", name: "Managing Human Capital", college: "D'Amore-McKim", totalCredits: 16, requirements: [{ code: "ORGB 3201", name: "Organizational Behavior", credits: 4 }, { code: "HRMG 3301", name: "Managing Human Capital", credits: 4 }, { code: "HRMG 3302", name: "Talent Acquisition and Development", credits: 4 }, { code: "HRMG 4301", name: "Strategic HR Management", credits: 4 }] },
  { id: "mktg-analytics", name: "Marketing Analytics", college: "D'Amore-McKim", totalCredits: 20, requirements: [{ code: "MKTG 2201", name: "Introduction to Marketing", credits: 4 }, { code: "MKTG 3401", name: "Marketing Research", credits: 4 }, { code: "MKTG 3501", name: "Marketing Analytics", credits: 4 }, { code: "MGSC 2301", name: "Business Statistics", credits: 4 }, { code: "MKTG 4501", name: "Predictive Marketing Models", credits: 4 }] },
  { id: "marketing", name: "Marketing", college: "D'Amore-McKim", totalCredits: 20, requirements: [{ code: "MKTG 2201", name: "Introduction to Marketing", credits: 4 }, { code: "MKTG 3303", name: "Consumer Behavior", credits: 4 }, { code: "MKTG 3401", name: "Marketing Research", credits: 4 }, { code: "MKTG 4502", name: "Managing Customer Engagement", credits: 4 }, { code: "MKTG 3501", name: "Marketing Analytics", credits: 4 }] },
  { id: "social-innovation", name: "Social Innovation and Entrepreneurship", college: "D'Amore-McKim", totalCredits: 16, requirements: [{ code: "ENTR 2301", name: "Entrepreneurship and New Ventures", credits: 4 }, { code: "ENTR 3302", name: "Social Entrepreneurship", credits: 4 }, { code: "ORGB 3201", name: "Organizational Behavior", credits: 4 }, { code: "ENTR 4303", name: "Impact Investing", credits: 4 }] },
  { id: "strategy", name: "Strategy", college: "D'Amore-McKim", totalCredits: 16, requirements: [{ code: "STRT 3501", name: "Strategic Analysis", credits: 4 }, { code: "STRT 4501", name: "Strategy in Action", credits: 4 }, { code: "ORGB 3201", name: "Organizational Behavior", credits: 4 }, { code: "INTB 1203", name: "International Business and Global Social Responsibility", credits: 4 }] },
  { id: "supply-chain", name: "Supply Chain Management", college: "D'Amore-McKim", totalCredits: 16, requirements: [{ code: "SCHM 2301", name: "Supply Chain and Operations Management", credits: 4 }, { code: "SCHM 3301", name: "Supply Chain Strategy", credits: 4 }, { code: "SCHM 3302", name: "Sourcing and Procurement", credits: 4 }, { code: "SCHM 4301", name: "Supply Chain Analytics", credits: 4 }] },
  { id: "sustainable-biz", name: "Sustainable Business Practices", college: "D'Amore-McKim", totalCredits: 16, requirements: [{ code: "FINA 2720", name: "Sustainability in the Business Environment", credits: 4 }, { code: "MGMT 3401", name: "Corporate Social Responsibility", credits: 4 }, { code: "INNO 3302", name: "Innovation Management", credits: 4 }, { code: "STRT 4502", name: "Sustainable Strategy", credits: 4 }] },

  // ── College of Social Sciences and Humanities (CSSH) ────────────────────
  { id: "economics", name: "Economics", college: "CSSH", totalCredits: 20, requirements: [{ code: "ECON 1115", name: "Principles of Macroeconomics", credits: 4 }, { code: "ECON 1116", name: "Principles of Microeconomics", credits: 4 }, { code: "ECON 2350", name: "Statistics for Economists", credits: 4 }, { code: "ECON 3101", name: "Intermediate Microeconomics", credits: 4 }, { code: "ECON 3102", name: "Intermediate Macroeconomics", credits: 4 }] },
  { id: "psychology", name: "Psychology", college: "CSSH", totalCredits: 20, requirements: [{ code: "PSYC 1101", name: "General Psychology", credits: 4 }, { code: "PSYC 2320", name: "Research Methods in Psychology", credits: 4 }, { code: "PSYC 3404", name: "Abnormal Psychology", credits: 4 }, { code: "PSYC 3458", name: "Cognitive Psychology", credits: 4 }, { code: "PSYC 4510", name: "Social Psychology", credits: 4 }] },
  { id: "political-science", name: "Political Science", college: "CSSH", totalCredits: 20, requirements: [{ code: "POLS 1150", name: "Introduction to Politics", credits: 4 }, { code: "POLS 2400", name: "Political Research Methods", credits: 4 }, { code: "POLS 3400", name: "Comparative Politics", credits: 4 }, { code: "POLS 3410", name: "International Relations", credits: 4 }, { code: "POLS 4500", name: "Political Theory", credits: 4 }] },
  { id: "sociology", name: "Sociology", college: "CSSH", totalCredits: 20, requirements: [{ code: "SOCL 1101", name: "Introduction to Sociology", credits: 4 }, { code: "SOCL 2352", name: "Social Research Methods", credits: 4 }, { code: "SOCL 3451", name: "Social Stratification", credits: 4 }, { code: "SOCL 3474", name: "Sociology of Organizations", credits: 4 }, { code: "SOCL 4550", name: "Sociological Theory", credits: 4 }] },
  { id: "history", name: "History", college: "CSSH", totalCredits: 20, requirements: [{ code: "HIST 1130", name: "World History to 1500", credits: 4 }, { code: "HIST 1131", name: "World History since 1500", credits: 4 }, { code: "HIST 2000", name: "Historical Methods", credits: 4 }, { code: "HIST 3000", name: "Upper-Level History Elective", credits: 4 }, { code: "HIST 4000", name: "Advanced History Seminar", credits: 4 }] },
  { id: "philosophy", name: "Philosophy", college: "CSSH", totalCredits: 20, requirements: [{ code: "PHIL 1101", name: "Introduction to Philosophy", credits: 4 }, { code: "PHIL 2325", name: "Ethics", credits: 4 }, { code: "PHIL 2350", name: "Logic", credits: 4 }, { code: "PHIL 3001", name: "Philosophy Elective", credits: 4 }, { code: "PHIL 4001", name: "Advanced Philosophy Seminar", credits: 4 }] },
  { id: "intl-affairs", name: "International Affairs", college: "CSSH", totalCredits: 20, requirements: [{ code: "INTL 1101", name: "Globalization and International Affairs", credits: 4 }, { code: "POLS 3410", name: "International Relations", credits: 4 }, { code: "ECON 1115", name: "Principles of Macroeconomics", credits: 4 }, { code: "INTL 3302", name: "International Political Economy", credits: 4 }, { code: "INTL 4500", name: "International Affairs Seminar", credits: 4 }] },
  { id: "criminal-justice", name: "Criminal Justice", college: "CSSH", totalCredits: 20, requirements: [{ code: "CRIM 1100", name: "Introduction to Criminal Justice", credits: 4 }, { code: "CRIM 2350", name: "Research Methods in Criminal Justice", credits: 4 }, { code: "CRIM 3300", name: "Criminology", credits: 4 }, { code: "CRIM 3400", name: "Law and Society", credits: 4 }, { code: "CRIM 4500", name: "Criminal Justice Policy", credits: 4 }] },
  { id: "linguistics", name: "Linguistics", college: "CSSH", totalCredits: 20, requirements: [{ code: "LING 1150", name: "Language and Linguistics", credits: 4 }, { code: "LING 2350", name: "Phonology and Morphology", credits: 4 }, { code: "LING 2360", name: "Syntax", credits: 4 }, { code: "LING 3400", name: "Semantics and Pragmatics", credits: 4 }, { code: "LING 4500", name: "Language Acquisition", credits: 4 }] },
  { id: "religion", name: "Religious Studies", college: "CSSH", totalCredits: 20, requirements: [{ code: "REL 1101", name: "Introduction to Religious Studies", credits: 4 }, { code: "REL 2300", name: "World Religions", credits: 4 }, { code: "REL 3001", name: "Religious Studies Elective", credits: 4 }, { code: "REL 3002", name: "Religious Studies Elective", credits: 4 }, { code: "REL 4001", name: "Advanced Seminar", credits: 4 }] },
  { id: "cultural-anth", name: "Cultural Anthropology", college: "CSSH", totalCredits: 20, requirements: [{ code: "ANTH 1101", name: "Introduction to Cultural Anthropology", credits: 4 }, { code: "ANTH 2301", name: "Anthropological Methods", credits: 4 }, { code: "ANTH 3300", name: "Culture and Society", credits: 4 }, { code: "ANTH 3400", name: "Ethnography", credits: 4 }, { code: "ANTH 4500", name: "Anthropology Seminar", credits: 4 }] },
  { id: "public-policy", name: "Public Policy", college: "CSSH", totalCredits: 20, requirements: [{ code: "POLS 1150", name: "Introduction to Politics", credits: 4 }, { code: "ECON 1116", name: "Principles of Microeconomics", credits: 4 }, { code: "POLS 3420", name: "Public Policy Analysis", credits: 4 }, { code: "POLS 3430", name: "Urban Policy", credits: 4 }, { code: "POLS 4520", name: "Policy Seminar", credits: 4 }] },
  { id: "human-services", name: "Human Services", college: "CSSH", totalCredits: 20, requirements: [{ code: "HUSV 1101", name: "Introduction to Human Services", credits: 4 }, { code: "HUSV 2300", name: "Social Welfare Policy", credits: 4 }, { code: "PSYC 1101", name: "General Psychology", credits: 4 }, { code: "HUSV 3300", name: "Case Management", credits: 4 }, { code: "HUSV 4500", name: "Human Services Practice", credits: 4 }] },
  { id: "womens-gender", name: "Women's, Gender, and Sexuality Studies", college: "CSSH", totalCredits: 20, requirements: [{ code: "WMNS 1101", name: "Introduction to Women's and Gender Studies", credits: 4 }, { code: "WMNS 2300", name: "Feminist Theory", credits: 4 }, { code: "WMNS 3300", name: "Gender and Society", credits: 4 }, { code: "WMNS 3400", name: "Sexuality Studies", credits: 4 }, { code: "WMNS 4500", name: "Advanced Seminar", credits: 4 }] },
  { id: "afr-american", name: "African American Studies", college: "CSSH", totalCredits: 20, requirements: [{ code: "AFAM 1101", name: "Introduction to African American Studies", credits: 4 }, { code: "AFAM 2300", name: "African American History", credits: 4 }, { code: "AFAM 3300", name: "Race and Society", credits: 4 }, { code: "AFAM 3400", name: "African Diaspora", credits: 4 }, { code: "AFAM 4500", name: "Advanced Seminar", credits: 4 }] },
  { id: "jewish-studies", name: "Jewish Studies", college: "CSSH", totalCredits: 16, requirements: [{ code: "JWST 1101", name: "Introduction to Jewish Studies", credits: 4 }, { code: "JWST 2300", name: "Jewish History", credits: 4 }, { code: "JWST 3300", name: "Jewish Culture and Society", credits: 4 }, { code: "JWST 4500", name: "Advanced Seminar", credits: 4 }] },
  { id: "asian-studies", name: "Asian Studies", college: "CSSH", totalCredits: 20, requirements: [{ code: "ASNS 1101", name: "Introduction to Asian Studies", credits: 4 }, { code: "ASNS 2300", name: "Asian History", credits: 4 }, { code: "ASNS 3300", name: "Asian Politics and Society", credits: 4 }, { code: "ASNS 3400", name: "Asian Cultures", credits: 4 }, { code: "ASNS 4500", name: "Advanced Seminar", credits: 4 }] },
  { id: "latin-amer", name: "Latin American and Latino Studies", college: "CSSH", totalCredits: 20, requirements: [{ code: "LALC 1101", name: "Introduction to Latin American Studies", credits: 4 }, { code: "LALC 2300", name: "Latin American History", credits: 4 }, { code: "LALC 3300", name: "Politics of Latin America", credits: 4 }, { code: "LALC 3400", name: "Latino Cultures in the US", credits: 4 }, { code: "LALC 4500", name: "Advanced Seminar", credits: 4 }] },
  { id: "comp-social-sci", name: "Computational Social Science", college: "CSSH", totalCredits: 20, requirements: [{ code: "MATH 1341", name: "Calculus 1 for Science", credits: 4 }, { code: "MATH 2280", name: "Statistics & Software", credits: 4 }, { code: "CS 2500", name: "Fundamentals of CS 1", credits: 4 }, { code: "POLS 2400", name: "Political Research Methods", credits: 4 }, { code: "DS 3000", name: "Foundations of Data Science", credits: 4 }] },
  { id: "health-hum-soc", name: "Health, Humanities, and Society", college: "CSSH", totalCredits: 20, requirements: [{ code: "HLTH 1101", name: "Introduction to Public Health", credits: 4 }, { code: "PHIL 2325", name: "Ethics", credits: 4 }, { code: "SOCL 1101", name: "Introduction to Sociology", credits: 4 }, { code: "HUSV 3400", name: "Health and Society", credits: 4 }, { code: "HLTH 3400", name: "Health Humanities Seminar", credits: 4 }] },

  // ── College of Arts, Media and Design (CAMD) ─────────────────────────────
  // Source: 2025-2026 catalog.northeastern.edu

  // ─ Art + Design minors ─
  { id: "animation", name: "Animation", college: "CAMD", totalCredits: 16, requirements: [{ code: "ARTF 1120", name: "Foundation Drawing", credits: 4 }, { code: "ARTD 2370", name: "Animation Basics", credits: 4 }, { code: "ARTD 3470", name: "Animation 1", credits: 4 }, { code: "ARTD 3471", name: "3D Animation", credits: 4 }] },
  { id: "art", name: "Art", college: "CAMD", totalCredits: 20, requirements: [{ code: "ARTF 1120", name: "Foundation Drawing", credits: 4 }, { code: "ARTF 1122", name: "Foundation 2D Design", credits: 4 }, { code: "ARTE 2300", name: "Intermediate Studio Elective", credits: 4 }, { code: "ARTE 3300", name: "Advanced Studio Elective", credits: 4 }, { code: "ARTH 2210", name: "Modern Art and Design History", credits: 4 }] },
  { id: "art-history", name: "Art History and Visual Studies", college: "CAMD", totalCredits: 20, requirements: [{ code: "ARTH 1001", name: "Visual Intelligence", credits: 4 }, { code: "ARTH 2210", name: "Modern Art and Design History", credits: 4 }, { code: "ARTH 2211", name: "Contemporary Art and Design History", credits: 4 }, { code: "ARTH 3000", name: "Topics in Visual Studies", credits: 4 }, { code: "ARTH 5100", name: "Contemporary Art Theory and Criticism", credits: 4 }] },
  { id: "creative-computing", name: "Creative Computing", college: "CAMD", totalCredits: 16, requirements: [{ code: "ARTD 2340", name: "Introduction to Computational Creative Practice", credits: 4 }, { code: "ARTG 2260", name: "Programming Basics", credits: 4 }, { code: "ARTD 3340", name: "Creative Computing Studio", credits: 4 }, { code: "ARTG 3250", name: "Physical Computing", credits: 4 }] },
  { id: "creative-fabrication", name: "Creative Fabrication", college: "CAMD", totalCredits: 16, requirements: [{ code: "ARTF 1124", name: "Foundation 3D Design", credits: 4 }, { code: "ARTG 2280", name: "Creative Fabrication 1", credits: 4 }, { code: "ARTG 3280", name: "Creative Fabrication 2", credits: 4 }, { code: "ARTG 3285", name: "Advanced Fabrication Studio", credits: 4 }] },
  { id: "data-viz", name: "Data Visualization", college: "CAMD", totalCredits: 16, requirements: [{ code: "ARTG 2260", name: "Programming Basics", credits: 4 }, { code: "ARTG 3270", name: "Information Design", credits: 4 }, { code: "DS 4200", name: "Information Presentation and Visualization", credits: 4 }, { code: "ARTG 4270", name: "Advanced Data Visualization", credits: 4 }] },
  { id: "design-minor", name: "Design", college: "CAMD", totalCredits: 16, requirements: [{ code: "ARTF 1122", name: "Foundation 2D Design", credits: 4 }, { code: "ARTG 2250", name: "Typography 1", credits: 4 }, { code: "ARTG 2260", name: "Programming Basics", credits: 4 }, { code: "ARTG 3250", name: "Physical Computing", credits: 4 }] },
  { id: "experience-design", name: "Experience Design", college: "CAMD", totalCredits: 16, requirements: [{ code: "ARTG 2260", name: "Programming Basics", credits: 4 }, { code: "ARTG 3460", name: "Experience Design 1", credits: 4 }, { code: "ARTG 3461", name: "User Research Methods", credits: 4 }, { code: "ARTG 4460", name: "Experience Design 2", credits: 4 }] },
  { id: "game-art", name: "Game Art", college: "CAMD", totalCredits: 16, requirements: [{ code: "ARTF 1120", name: "Foundation Drawing", credits: 4 }, { code: "ARTD 2370", name: "Animation Basics", credits: 4 }, { code: "ARTD 3472", name: "Character Design for Animation", credits: 4 }, { code: "ARTD 3473", name: "Animation for Games", credits: 4 }] },
  { id: "game-design", name: "Game Design", college: "CAMD", totalCredits: 16, requirements: [{ code: "ARTF 1122", name: "Foundation 2D Design", credits: 4 }, { code: "GAME 2300", name: "Game Design 1", credits: 4 }, { code: "GAME 3300", name: "Game Design 2", credits: 4 }, { code: "GAME 3500", name: "Advanced Game Design", credits: 4 }] },
  { id: "graphic-design", name: "Graphic and Information Design", college: "CAMD", totalCredits: 20, requirements: [{ code: "ARTF 1122", name: "Foundation 2D Design", credits: 4 }, { code: "ARTG 2250", name: "Typography 1", credits: 4 }, { code: "ARTG 2252", name: "Graphic Design 1", credits: 4 }, { code: "ARTG 3250", name: "Physical Computing", credits: 4 }, { code: "ARTG 3252", name: "Information Design", credits: 4 }] },
  { id: "immersive-media", name: "Immersive Media", college: "CAMD", totalCredits: 16, requirements: [{ code: "ARTD 2000", name: "Introduction to Immersive Media", credits: 4 }, { code: "ARTD 3000", name: "Immersive Media Studio 1", credits: 4 }, { code: "ARTD 3001", name: "Immersive Media Studio 2", credits: 4 }, { code: "ARTD 4000", name: "Advanced Immersive Media", credits: 4 }] },
  { id: "interaction-design", name: "Interaction Design", college: "CAMD", totalCredits: 16, requirements: [{ code: "ARTG 2260", name: "Programming Basics", credits: 4 }, { code: "ARTG 2262", name: "Prototyping with Code", credits: 2 }, { code: "ARTG 3460", name: "Interaction Design 1", credits: 4 }, { code: "ARTG 4460", name: "Interaction Design 2", credits: 4 }] },
  { id: "photography", name: "Photography", college: "CAMD", totalCredits: 16, requirements: [{ code: "ARTD 2360", name: "Introduction to Photography", credits: 4 }, { code: "ARTD 2361", name: "Photo Tools", credits: 1 }, { code: "ARTD 3360", name: "Photography 1", credits: 4 }, { code: "ARTD 3361", name: "Photography 2", credits: 4 }] },
  { id: "video-arts", name: "Video Arts", college: "CAMD", totalCredits: 16, requirements: [{ code: "ARTD 2380", name: "Video Basics", credits: 4 }, { code: "ARTD 2381", name: "Video Tools", credits: 1 }, { code: "ARTD 3480", name: "Video Art 1", credits: 4 }, { code: "ARTD 3485", name: "Experimental Video", credits: 4 }] },

  // ─ Communication Studies minors ─
  { id: "argumentation-law", name: "Argumentation and Law", college: "CAMD", totalCredits: 16, requirements: [{ code: "COMM 2550", name: "Argumentation and Advocacy", credits: 4 }, { code: "COMM 3360", name: "Rhetoric and Public Discourse", credits: 4 }, { code: "COMM 3370", name: "Law and Free Expression", credits: 4 }, { code: "COMM 4360", name: "Intellectual Property and Privacy", credits: 4 }] },
  { id: "cinema-studies", name: "Cinema Studies", college: "CAMD", totalCredits: 16, requirements: [{ code: "MSCR 1230", name: "Introduction to Film", credits: 4 }, { code: "MSCR 2300", name: "Film Theory", credits: 4 }, { code: "MSCR 3300", name: "Film History", credits: 4 }, { code: "MSCR 3400", name: "Cinema Studies Elective", credits: 4 }] },
  { id: "comm-studies", name: "Communication Studies", college: "CAMD", totalCredits: 20, requirements: [{ code: "COMM 1101", name: "Communication Fundamentals", credits: 4 }, { code: "COMM 2340", name: "Interpersonal Communication", credits: 4 }, { code: "COMM 2310", name: "Media and Society", credits: 4 }, { code: "COMM 3310", name: "Organizational Communication", credits: 4 }, { code: "COMM 4610", name: "Communication Research", credits: 4 }] },
  { id: "digital-comm", name: "Digital Communication", college: "CAMD", totalCredits: 16, requirements: [{ code: "COMM 1101", name: "Communication Fundamentals", credits: 4 }, { code: "COMM 2320", name: "Digital and Social Media", credits: 4 }, { code: "COMM 3320", name: "Digital Communication Strategy", credits: 4 }, { code: "COMM 4320", name: "Advanced Digital Communication", credits: 4 }] },
  { id: "film-production", name: "Film Production", college: "CAMD", totalCredits: 16, requirements: [{ code: "MSCR 1230", name: "Introduction to Film", credits: 4 }, { code: "MSCR 2380", name: "Documentary Production", credits: 4 }, { code: "MSCR 2390", name: "Narrative Film Production", credits: 4 }, { code: "MSCR 3380", name: "Advanced Film Production", credits: 4 }] },
  { id: "film-studies", name: "Film Studies", college: "CAMD", totalCredits: 16, requirements: [{ code: "MSCR 1230", name: "Introduction to Film", credits: 4 }, { code: "MSCR 2300", name: "Film Theory", credits: 4 }, { code: "MSCR 3300", name: "Film History", credits: 4 }, { code: "MSCR 3410", name: "Film Studies Elective", credits: 4 }] },
  { id: "human-comm", name: "Human Communication", college: "CAMD", totalCredits: 16, requirements: [{ code: "COMM 1101", name: "Communication Fundamentals", credits: 4 }, { code: "COMM 2340", name: "Interpersonal Communication", credits: 4 }, { code: "COMM 3230", name: "Interpersonal Communication Advanced", credits: 4 }, { code: "COMM 3310", name: "Organizational Communication", credits: 4 }] },
  { id: "improv-storytelling", name: "Improvisation and Storytelling", college: "CAMD", totalCredits: 16, requirements: [{ code: "COMM 1112", name: "Public Speaking", credits: 4 }, { code: "THTR 2301", name: "Acting Fundamentals", credits: 4 }, { code: "COMM 2530", name: "Storytelling", credits: 4 }, { code: "COMM 3530", name: "Advanced Improvisation", credits: 4 }] },
  { id: "media-screen", name: "Media and Screen Studies", college: "CAMD", totalCredits: 16, requirements: [{ code: "MSCR 1200", name: "Foundations of Media and Screen Studies", credits: 4 }, { code: "MSCR 2300", name: "Film Theory", credits: 4 }, { code: "MSCR 2310", name: "Television and Media Culture", credits: 4 }, { code: "MSCR 3400", name: "Media Studies Elective", credits: 4 }] },
  { id: "media-production", name: "Media Production", college: "CAMD", totalCredits: 16, requirements: [{ code: "MSCR 1230", name: "Introduction to Film", credits: 4 }, { code: "MSCR 2380", name: "Documentary Production", credits: 4 }, { code: "COMM 2310", name: "Media and Society", credits: 4 }, { code: "MSCR 3380", name: "Advanced Media Production", credits: 4 }] },
  { id: "oratory", name: "Oratory and Public Speaking", college: "CAMD", totalCredits: 16, requirements: [{ code: "COMM 1112", name: "Public Speaking", credits: 4 }, { code: "COMM 2550", name: "Argumentation and Advocacy", credits: 4 }, { code: "COMM 3550", name: "Advanced Public Speaking", credits: 4 }, { code: "COMM 3560", name: "Rhetorical Theory", credits: 4 }] },
  { id: "political-comm", name: "Political Communication", college: "CAMD", totalCredits: 16, requirements: [{ code: "COMM 1101", name: "Communication Fundamentals", credits: 4 }, { code: "POLS 1150", name: "Introduction to Politics", credits: 4 }, { code: "COMM 3400", name: "Political Communication", credits: 4 }, { code: "COMM 4400", name: "Advanced Political Communication", credits: 4 }] },
  { id: "rhetoric", name: "Rhetoric", college: "CAMD", totalCredits: 16, requirements: [{ code: "COMM 2550", name: "Argumentation and Advocacy", credits: 4 }, { code: "COMM 3360", name: "Rhetoric and Public Discourse", credits: 4 }, { code: "COMM 3560", name: "Rhetorical Theory", credits: 4 }, { code: "COMM 4560", name: "Advanced Rhetoric Seminar", credits: 4 }] },
  { id: "social-activism", name: "Social Activism", college: "CAMD", totalCredits: 16, requirements: [{ code: "COMM 1101", name: "Communication Fundamentals", credits: 4 }, { code: "COMM 3370", name: "Law and Free Expression", credits: 4 }, { code: "COMM 3450", name: "Social Movements and Communication", credits: 4 }, { code: "COMM 4450", name: "Activism and Social Change", credits: 4 }] },
  { id: "sports-media", name: "Sports, Media, and Communication", college: "CAMD", totalCredits: 16, requirements: [{ code: "COMM 1101", name: "Communication Fundamentals", credits: 4 }, { code: "COMM 2120", name: "Sports Communication", credits: 4 }, { code: "MSCR 2310", name: "Television and Media Culture", credits: 4 }, { code: "COMM 3120", name: "Advanced Sports Communication", credits: 4 }] },

  // ─ Journalism minors ─
  { id: "science-comm", name: "Science Communication", college: "CAMD", totalCredits: 16, requirements: [{ code: "COMM 1125", name: "Science, Communication, and Society", credits: 4 }, { code: "JRNL 3650", name: "Science Writing", credits: 4 }, { code: "JRNL 3700", name: "Data Storytelling", credits: 4 }, { code: "COMM 3500", name: "Environmental Issues and the Media", credits: 4 }] },

  // ─ Music minors ─
  { id: "music", name: "Music", college: "CAMD", totalCredits: 20, requirements: [{ code: "MUSC 1001", name: "Music in Everyday Life", credits: 4 }, { code: "MUSC 1210", name: "Music Theory 1", credits: 4 }, { code: "MUSC 2301", name: "Music History 1", credits: 4 }, { code: "MUSC 2302", name: "Music History 2", credits: 4 }, { code: "MUSC 3001", name: "Music Elective", credits: 4 }] },
  { id: "music-industry", name: "Music Industry", college: "CAMD", totalCredits: 20, requirements: [{ code: "MUSC 1001", name: "Music in Everyday Life", credits: 4 }, { code: "MUSI 2330", name: "Performing Arts Administration", credits: 4 }, { code: "MUSI 3300", name: "Music Business", credits: 4 }, { code: "MUSI 3310", name: "Music Marketing", credits: 4 }, { code: "MUSI 4300", name: "Music Industry Seminar", credits: 4 }] },
  { id: "music-perf", name: "Music Performance", college: "CAMD", totalCredits: 20, requirements: [{ code: "MUSC 1210", name: "Music Theory 1", credits: 4 }, { code: "MUSC 1220", name: "Music Theory 2", credits: 4 }, { code: "MUSC 3100", name: "Private Instruction", credits: 4 }, { code: "MUSC 2100", name: "Ensemble Performance", credits: 4 }, { code: "MUSC 3001", name: "Music Elective", credits: 4 }] },
  { id: "music-tech", name: "Music Technology", college: "CAMD", totalCredits: 20, requirements: [{ code: "MUSC 1001", name: "Music in Everyday Life", credits: 4 }, { code: "MUSI 1230", name: "Music Technology 1", credits: 4 }, { code: "MUSI 2230", name: "Music Technology 2", credits: 4 }, { code: "MUSI 3230", name: "Advanced Music Technology", credits: 4 }, { code: "MUSI 4230", name: "Music Technology Seminar", credits: 4 }] },

  // ─ Architecture minors ─
  { id: "arch-design", name: "Architectural Design", college: "CAMD", totalCredits: 16, requirements: [{ code: "ARCH 1150", name: "Architectural Representation", credits: 4 }, { code: "ARCH 2201", name: "Architectural Design 1", credits: 4 }, { code: "ARCH 2310", name: "Architectural History 1", credits: 4 }, { code: "ARCH 3201", name: "Building Technology", credits: 4 }] },
  { id: "arch-history", name: "Architectural and Urban History", college: "CAMD", totalCredits: 16, requirements: [{ code: "ARCH 2310", name: "Architectural History 1", credits: 4 }, { code: "ARCH 2311", name: "Architectural History 2", credits: 4 }, { code: "ARCH 3310", name: "Urban History", credits: 4 }, { code: "ARCH 4310", name: "Advanced Architectural History Seminar", credits: 4 }] },
  { id: "arch-sci", name: "Architectural Science and Systems", college: "CAMD", totalCredits: 16, requirements: [{ code: "ARCH 2201", name: "Architectural Design 1", credits: 4 }, { code: "ARCH 3201", name: "Building Technology", credits: 4 }, { code: "ARCH 3400", name: "Environmental Systems", credits: 4 }, { code: "ARCH 3410", name: "Structural Systems", credits: 4 }] },

  // ─ Theatre minors ─
  { id: "theatre", name: "Theatre", college: "CAMD", totalCredits: 20, requirements: [{ code: "THTR 1101", name: "Introduction to Theatre", credits: 4 }, { code: "THTR 2301", name: "Acting Fundamentals", credits: 4 }, { code: "THTR 2400", name: "Theatre History", credits: 4 }, { code: "THTR 3300", name: "Advanced Theatre Practice", credits: 4 }, { code: "THTR 3400", name: "Theatre Elective", credits: 4 }] },
  { id: "theatre-social", name: "Theatre, Performance, and Social Change", college: "CAMD", totalCredits: 16, requirements: [{ code: "THTR 1101", name: "Introduction to Theatre", credits: 4 }, { code: "THTR 2450", name: "Performance and Social Justice", credits: 4 }, { code: "THTR 3450", name: "Theatre for Social Change", credits: 4 }, { code: "THTR 4450", name: "Applied Theatre Seminar", credits: 4 }] },
  { id: "theatrical-design", name: "Theatrical Design", college: "CAMD", totalCredits: 16, requirements: [{ code: "THTR 2301", name: "Acting Fundamentals", credits: 4 }, { code: "THTR 2500", name: "Scenic Design", credits: 4 }, { code: "THTR 2510", name: "Costume Design", credits: 4 }, { code: "THTR 2520", name: "Lighting Design", credits: 4 }] },
  { id: "performing-arts-admin", name: "Performing Arts Administration", college: "CAMD", totalCredits: 20, requirements: [{ code: "MUSI 2330", name: "Performing Arts Administration", credits: 4 }, { code: "COMM 3310", name: "Organizational Communication", credits: 4 }, { code: "THTR 3600", name: "Arts Management", credits: 4 }, { code: "MKTG 2201", name: "Introduction to Marketing", credits: 4 }, { code: "THTR 4600", name: "Performing Arts Seminar", credits: 4 }] },

  // ─ Interdisciplinary CAMD minor ─
  { id: "creativity-theory", name: "Creativity in Theory and Practice", college: "CAMD", totalCredits: 16, requirements: [{ code: "ARTF 1122", name: "Foundation 2D Design", credits: 4 }, { code: "COMM 2310", name: "Media and Society", credits: 4 }, { code: "CAMD 3001", name: "Creativity in Theory", credits: 4 }, { code: "CAMD 3002", name: "Creativity in Practice", credits: 4 }] },

  // ── College of Engineering (COE) ─────────────────────────────────────────
  { id: "biomedical-eng", name: "Biomedical Engineering", college: "COE", totalCredits: 27, requirements: [{ code: "BIOL 1111", name: "General Biology 1 (with BIOL 1112 lab)", credits: 5 }, { code: "BIOL 2217", name: "Integrated Anatomy and Physiology 1 (with BIOL 2218 lab)", credits: 5 }, { code: "Elective", name: "Engineering research, directed study, or special topics (choose 1)", credits: 4, alts: ["EECE 4991", "EECE 4992", "EECE 5698"] }, { code: "EECE 4791", name: "Electrical and Computer Engineering Capstone 1", credits: 1 }, { code: "EECE 4792", name: "Electrical and Computer Engineering Capstone 2", credits: 4 }, { code: "Elective", name: "Biomedical elective (choose 2)", credits: 4, alts: ["BIOL 1113", "BIOL 2219", "BIOL 2299", "BIOL 2301", "BIOL 3405", "BIOL 4991", "BIOL 5581", "CHME 5630", "CHME 5699", "CIVE 7251", "EECE 4991", "EECE 4992", "EECE 5698", "IE 4522", "ME 5665", "PHYS 4621", "PHYS 4623", "PHYS 4651", "PHYS 4652", "PSYC 3452", "PSYC 3458"] }, { code: "Elective", name: "Biomedical elective (choose 2)", credits: 4, alts: ["BIOL 1113", "BIOL 2219", "BIOL 2299", "BIOL 2301", "BIOL 3405", "BIOL 4991", "BIOL 5581", "CHME 5630", "CHME 5699", "CIVE 7251", "EECE 4991", "EECE 4992", "EECE 5698", "IE 4522", "ME 5665", "PHYS 4621", "PHYS 4623", "PHYS 4651", "PHYS 4652", "PSYC 3452", "PSYC 3458"] }] },
  { id: "comp-data-analytics", name: "Computational Data Analytics", college: "COE", totalCredits: 20, requirements: [{ code: "EECE 5642", name: "Data Visualization", credits: 4 }, { code: "EECE 5644", name: "Introduction to Machine Learning and Pattern Recognition", credits: 4 }, { code: "EECE 2140", name: "Computing Fundamentals for Engineers", credits: 4 }, { code: "Elective", name: "Probability and statistics (choose 1 of 6)", credits: 4, alts: ["BIOE 2365", "CIVE 3464", "EECE 3468", "IE 3412", "MATH 2280", "MATH 3081"] }, { code: "Elective", name: "Data analytics elective (choose 1 of 9)", credits: 4, alts: ["CS 3000", "CS 3200", "CS 5200", "EECE 2520", "EECE 2560", "EECE 4694", "EECE 5639", "IE 4515", "IE 5640"] }] },
  { id: "mechanical-eng", name: "Mechanical Engineering", college: "COE", totalCredits: 20, requirements: [{ code: "ME 2340", name: "Thermodynamics", credits: 4 }, { code: "ME 3460", name: "Fluid Mechanics", credits: 4 }, { code: "ME 3470", name: "Heat Transfer", credits: 4 }, { code: "MEIE 2600", name: "Engineering Mechanics", credits: 4 }, { code: "ME 4510", name: "Mechanical Design", credits: 4 }] },
  { id: "civil-eng", name: "Civil Engineering", college: "COE", totalCredits: 20, requirements: [{ code: "CE 2340", name: "Statics", credits: 4 }, { code: "CE 3460", name: "Structural Analysis", credits: 4 }, { code: "CE 3470", name: "Geotechnical Engineering", credits: 4 }, { code: "CE 3480", name: "Fluid Mechanics", credits: 4 }, { code: "CE 4500", name: "Civil Engineering Design", credits: 4 }] },
  { id: "materials-sci", name: "Materials Science and Engineering", college: "COE", totalCredits: 20, requirements: [{ code: "MATL 2350", name: "Materials Science", credits: 4 }, { code: "MATL 3450", name: "Mechanical Behavior of Materials", credits: 4 }, { code: "MATL 3460", name: "Electronic Properties", credits: 4 }, { code: "MATL 3470", name: "Materials Characterization", credits: 4 }, { code: "MATL 4500", name: "Materials Design", credits: 4 }] },
  { id: "industrial-eng", name: "Industrial Engineering", college: "COE", totalCredits: 20, requirements: [{ code: "IE 3412", name: "Engineering Statistics", credits: 4 }, { code: "IE 3420", name: "Operations Research", credits: 4 }, { code: "IE 4512", name: "Financial Engineering", credits: 4 }, { code: "IE 4520", name: "Manufacturing Systems", credits: 4 }, { code: "SCHM 2301", name: "Supply Chain and Operations", credits: 4 }] },
  { id: "entr-eng", name: "Entrepreneurial Engineering", college: "COE", totalCredits: 16, requirements: [{ code: "ENTR 2301", name: "Entrepreneurship and New Ventures", credits: 4 }, { code: "INNO 2301", name: "Foundations of Innovation", credits: 4 }, { code: "IE 4512", name: "Financial Engineering", credits: 4 }, { code: "ENTR 3301", name: "New Venture Creation", credits: 4 }] },
  { id: "sustainable-energy", name: "Sustainable Energy Systems", college: "COE", totalCredits: 20, requirements: [{ code: "PHYS 1151", name: "Physics for Engineering 1", credits: 4 }, { code: "ME 2340", name: "Thermodynamics", credits: 4 }, { code: "CHME 3312", name: "Chemical Engineering Thermodynamics", credits: 4 }, { code: "CE 4650", name: "Sustainable Infrastructure", credits: 4 }, { code: "EECE 3460", name: "Energy Systems", credits: 4 }] },
  { id: "global-eng", name: "Global Perspectives in Engineering", college: "COE", totalCredits: 16, requirements: [{ code: "INTL 1101", name: "Globalization and International Affairs", credits: 4 }, { code: "IE 4520", name: "Manufacturing Systems", credits: 4 }, { code: "ENGR 3000", name: "Engineering Ethics and Society", credits: 4 }, { code: "ENGR 4000", name: "Global Engineering Practice", credits: 4 }] },

  // ── Bouvé College of Health Sciences ─────────────────────────────────────
  // Source: 2025-2026 catalog.northeastern.edu
  { id: "audiology", name: "Audiology", college: "Bouvé", totalCredits: 16, requirements: [{ code: "SLPA 1203", name: "Introduction to Audiology", credits: 4 }, { code: "SLPA 1205", name: "Speech and Hearing Science", credits: 4 }, { code: "SLPA 4203", name: "Advanced Audiology", credits: 4 }, { code: "SLPA 4219", name: "Introduction to Aural Rehabilitation", credits: 3 }] },
  { id: "comm-sci-disorders", name: "Communication Sciences and Disorders", college: "Bouvé", totalCredits: 16, requirements: [{ code: "SLPA 1101", name: "Bridging Minds: Intro to Speech, Language, and Hearing Sciences", credits: 4 }, { code: "SLPA 1102", name: "Language Development", credits: 4 }, { code: "SLPA 1103", name: "Anatomy and Physiology of Speech and Hearing", credits: 4 }, { code: "SLPA 1203", name: "Introduction to Audiology", credits: 4 }] },
  { id: "early-intervention", name: "Early Intervention", college: "Bouvé", totalCredits: 20, requirements: [{ code: "CAEP 5151", name: "Early Intervention: Infant and Toddler Development", credits: 4 }, { code: "SLPA 5152", name: "Early Intervention: Planning and Evaluating Services", credits: 4 }, { code: "CAEP 5153", name: "Early Intervention: Assessment and Intervention", credits: 4 }, { code: "SLPA 5154", name: "Early Intervention Practicum 1", credits: 4 }, { code: "SLPA 5155", name: "Early Intervention Practicum 2", credits: 4 }] },
  { id: "exercise-sci", name: "Exercise Science", college: "Bouvé", totalCredits: 20, requirements: [{ code: "EXSC 1120", name: "Introduction to Exercise, Fitness, and Health", credits: 4 }, { code: "BIOL 2217", name: "Anatomy and Physiology 1", credits: 4 }, { code: "BIOL 2219", name: "Anatomy and Physiology 2", credits: 4 }, { code: "EXSC 4500", name: "Exercise Physiology 1", credits: 4 }, { code: "EXSC 4501", name: "Lab for Exercise Physiology", credits: 1 }] },
  { id: "global-health", name: "Global Health", college: "Bouvé", totalCredits: 20, requirements: [{ code: "PHTH 1270", name: "Introduction to Global Health", credits: 4 }, { code: "PHTH 2350", name: "Community and Public Health", credits: 4 }, { code: "PHTH 2210", name: "Foundations of Biostatistics", credits: 4 }, { code: "PHTH 2515", name: "Social Determinants of Health", credits: 4 }, { code: "INTL 1101", name: "Globalization and International Affairs", credits: 4 }] },
  { id: "healthcare-ops", name: "Healthcare System Operations", college: "COE", totalCredits: 16, requirements: [{ code: "IE 5617", name: "Lean Concepts and Applications", credits: 4 }, { code: "IE 5400", name: "Healthcare Systems Modeling and Analysis", credits: 4 }, { code: "PHTH 1260", name: "The American Healthcare System", credits: 4 }, { code: "PHTH 4511", name: "Healthcare Management", credits: 4 }] },
  { id: "health-hum-soc", name: "Health, Humanities, and Society", college: "Bouvé", totalCredits: 20, requirements: [{ code: "HLTH 1205", name: "Wellness", credits: 4 }, { code: "PHIL 2325", name: "Ethics", credits: 4 }, { code: "SOCL 1101", name: "Introduction to Sociology", credits: 4 }, { code: "PHTH 1260", name: "The American Healthcare System", credits: 4 }, { code: "ANTH 3441", name: "Medical Anthropology", credits: 4 }] },
  { id: "health-psych", name: "Health Psychology", college: "Bouvé", totalCredits: 20, requirements: [{ code: "PSYC 1101", name: "Foundations of Psychology", credits: 4 }, { code: "CAEP 3480", name: "Counseling Theories and Practice", credits: 4 }, { code: "PHTH 2350", name: "Community and Public Health", credits: 4 }, { code: "PSYC 3402", name: "Social Psychology", credits: 4 }, { code: "PSYC 3458", name: "Biological Psychology", credits: 4 }] },
  { id: "human-movement", name: "Human Movement Science", college: "Bouvé", totalCredits: 16, requirements: [{ code: "PT 3300", name: "Human Gross Anatomy", credits: 3 }, { code: "PT 3301", name: "Lab for Human Gross Anatomy", credits: 1 }, { code: "PT 3400", name: "Human Kinesiology", credits: 4 }, { code: "PT 3500", name: "Motor Control of Human Movement", credits: 4 }, { code: "PT 1880", name: "Introduction to Sports Medicine", credits: 4 }] },
  { id: "mindfulness", name: "Mindfulness Studies", college: "Bouvé", totalCredits: 20, requirements: [{ code: "CAEP 1280", name: "Introduction to Mindfulness", credits: 4 }, { code: "CAEP 1290", name: "Personal Behavior Change", credits: 4 }, { code: "CAEP 3480", name: "Counseling Theories and Practice", credits: 4 }, { code: "HLTH 5002", name: "Mindfulness: Theory and Practice", credits: 4 }, { code: "PSYC 3402", name: "Social Psychology", credits: 4 }] },
  { id: "nutrition", name: "Nutrition", college: "Bouvé", totalCredits: 20, requirements: [{ code: "HSCI 1105", name: "Human Nutrition", credits: 4 }, { code: "HSCI 2350", name: "Advanced Nutrition in Health and Disease", credits: 4 }, { code: "HSCI 2500", name: "Public Health Nutrition in the Community", credits: 4 }, { code: "PHTH 2350", name: "Community and Public Health", credits: 4 }, { code: "EXSC 5240", name: "Clinical Nutrition Applications in Health and Disease", credits: 4 }] },
  { id: "pharma-sci", name: "Pharmaceutical Sciences", college: "Bouvé", totalCredits: 15, requirements: [{ code: "PHSC 2301", name: "Human Physiology 1", credits: 4 }, { code: "PHSC 2303", name: "Human Physiology 2", credits: 4 }, { code: "PHSC 3430", name: "Pharmacokinetics and Biopharmaceutics", credits: 4 }, { code: "PHSC 3412", name: "Pharmaceutics 2", credits: 3 }] },
  { id: "public-health", name: "Public Health", college: "Bouvé", totalCredits: 18, requirements: [{ code: "PHTH 1260", name: "The American Healthcare System", credits: 4 }, { code: "PHTH 2350", name: "Community and Public Health", credits: 4 }, { code: "PHTH 2210", name: "Foundations of Biostatistics", credits: 4 }, { code: "PHTH 2515", name: "Social Determinants of Health", credits: 4 }, { code: "PHTH 2414", name: "Environmental Health", credits: 4 }] },
  { id: "slpa-minor", name: "Speech-Language Pathology and Audiology", college: "Bouvé", totalCredits: 20, requirements: [{ code: "SLPA 1102", name: "Language Development", credits: 4 }, { code: "SLPA 1103", name: "Anatomy and Physiology of Speech and Hearing", credits: 4 }, { code: "SLPA 1200", name: "Phonetics", credits: 4 }, { code: "SLPA 1203", name: "Introduction to Audiology", credits: 4 }, { code: "SLPA 1205", name: "Speech and Hearing Science", credits: 4 }] },
  { id: "wellness", name: "Wellness Studies", college: "Bouvé", totalCredits: 15, requirements: [{ code: "HLTH 1205", name: "Wellness", credits: 4 }, { code: "NRSG 5000", name: "Advanced Perspectives in Wellness", credits: 4 }, { code: "EXSC 1120", name: "Introduction to Exercise, Fitness, and Health", credits: 4 }, { code: "HSCI 1105", name: "Human Nutrition", credits: 4 }] },
  // Added from the 2025–26 / 2026–27 Northeastern catalog and Bouvé program pages.
  { id: "health-equity", name: "Health Equity", college: "Bouvé", totalCredits: 16, requirements: [{ code: "PHTH 2350", name: "Community in Public Health", credits: 4, alts: ["PHTH 2351"] }, { code: "HLTH 5311", name: "Advancing Health Literacy Through Communication", credits: 4 }, { code: "HLTH 5320", name: "Health Equity and Justice in Action in the Health Professions", credits: 4 }, { code: "Elective", name: "Health equity elective (choose 1 of 8)", credits: 4, alts: ["CAEP 5879", "HLTH 5280", "HLTH 5700", "INMI 1877", "INMI 2127", "PHTH 4120", "SOCL 1225", "SUST 2820"] }] },
  { id: "ethnomusicology", name: "Ethnomusicology", college: "CAMD", totalCredits: 16, requirements: [{ code: "MUSC 1001", name: "Music in Everyday Life", credits: 4 }, { code: "MUSC 2330", name: "Musical Communities of Boston", credits: 4 }, { code: "Elective", name: "Ethnomusicology elective (choose 2 of 11)", credits: 4, alts: ["MUSC 2101", "MUSC 2313", "MUSC 2331", "MUSC 2336", "MUSC 3353", "MUSC 3354", "MUSC 3355", "MUSI 3210", "MUSI 3351", "MUSI 3360", "MUSI 3401"] }, { code: "Elective", name: "Ethnomusicology elective (choose 2 of 11)", credits: 4, alts: ["MUSC 2101", "MUSC 2313", "MUSC 2331", "MUSC 2336", "MUSC 3353", "MUSC 3354", "MUSC 3355", "MUSI 3210", "MUSI 3351", "MUSI 3360", "MUSI 3401"] }] },
  { id: "music-composition", name: "Music Composition", college: "CAMD", totalCredits: 20, requirements: [{ code: "MUSC 1001", name: "Music in Everyday Life", credits: 4, alts: ["MUSC 1002"] }, { code: "MUSC 1201", name: "Music Theory 1", credits: 4 }, { code: "MUSC 1301", name: "Introduction to Music Composition", credits: 4, alts: ["MUSC 2420"] }, { code: "Elective", name: "Composition elective (choose 2 of 10)", credits: 4, alts: ["MUSC 1202", "MUSC 1204", "MUSC 2150", "MUSC 2208", "MUSC 2420", "MUSC 2425", "MUSC 3541", "MUST 1220", "MUST 2102", "MUST 2320"] }, { code: "Elective", name: "Composition elective (choose 2 of 10)", credits: 4, alts: ["MUSC 1202", "MUSC 1204", "MUSC 2150", "MUSC 2208", "MUSC 2420", "MUSC 2425", "MUSC 3541", "MUST 1220", "MUST 2102", "MUST 2320"] }] },
  { id: "music-recording", name: "Music Recording", college: "CAMD", totalCredits: 16, requirements: [{ code: "MUSI 2232", name: "Music Production and Recording 1", credits: 4 }, { code: "MUSI 2331", name: "Music Production and Recording 2", credits: 4 }, { code: "MUSI 3341", name: "Music Production and Recording 3", credits: 4 }, { code: "Elective", name: "Recording elective (choose 1 of 8)", credits: 4, alts: ["MUSC 1001", "MUSC 1002", "MUSC 2210", "MUSC 3342", "MUSI 1230", "MUSI 2341", "MUSI 3333", "MUST 2320"] }] },
  { id: "songwriting", name: "Songwriting", college: "CAMD", totalCredits: 16, requirements: [{ code: "MUSC 1119", name: "Music theory (MUSC 1119, 1201, or 1204)", credits: 4, alts: ["MUSC 1201", "MUSC 1204"] }, { code: "MUSC 2210", name: "Introduction to Songwriting", credits: 4 }, { code: "Elective", name: "Songwriting elective (choose 2 of 9)", credits: 4, alts: ["MUSC 1001", "MUSC 2105", "MUSC 2150", "MUSC 2211", "MUSI 2101", "MUSI 2232", "MUSI 2235", "MUSI 2331", "MUSI 5220"] }, { code: "Elective", name: "Songwriting elective (choose 2 of 9)", credits: 4, alts: ["MUSC 1001", "MUSC 2105", "MUSC 2150", "MUSC 2211", "MUSI 2101", "MUSI 2232", "MUSI 2235", "MUSI 2331", "MUSI 5220"] }] },
  { id: "journalism-practice", name: "Journalism Practice", college: "CAMD", totalCredits: 17, requirements: [{ code: "JRNL 1101", name: "Journalism 1 (with JRNL 1102 Journalist’s Toolbox)", credits: 5 }, { code: "JRNL 2201", name: "Journalism 2: Intermediate Reporting", credits: 4 }, { code: "Elective", name: "Restricted journalism elective (choose 1 of 13)", credits: 4, alts: ["JRNL 3370", "JRNL 3610", "JRNL 3630", "JRNL 3650", "JRNL 3680", "JRNL 3700", "JRNL 5309", "JRNL 5310", "JRNL 5311", "JRNL 5314", "JRNL 5360", "JRNL 5460", "JRNL 5500"] }, { code: "Elective", name: "Any additional JRNL course", credits: 4, alts: ["JRNL*"] }] },
  { id: "journalism-studies", name: "Journalism Studies", college: "CAMD", totalCredits: 16, requirements: [{ code: "JRNL 1150", name: "Understanding Today’s News", credits: 4 }, { code: "JRNL 2350", name: "The History of Journalism", credits: 4 }, { code: "JRNL 3550", name: "The First Amendment and the Media", credits: 4 }, { code: "Elective", name: "Any JRNL course", credits: 4, alts: ["JRNL*"] }] },
  { id: "photojournalism", name: "Photojournalism", college: "CAMD", totalCredits: 16, requirements: [{ code: "ARTD 2360", name: "Introduction to Photography (with ARTD 2361), or ARTE 2500", credits: 4, alts: ["ARTE 2500"] }, { code: "ARTD 3460", name: "Photography: Concept + Process", credits: 4 }, { code: "JRNL 5310", name: "Photojournalism", credits: 4 }, { code: "Elective", name: "Photojournalism elective (choose 1 of 2)", credits: 4, alts: ["JRNL 2301", "JRNL 5314"] }] },
  { id: "public-relations", name: "Public Relations", college: "CAMD", totalCredits: 17, requirements: [{ code: "JRNL 1101", name: "Journalism 1 (with JRNL 1102 Journalist’s Toolbox)", credits: 5 }, { code: "PREL 1425", name: "Public Relations Principles", credits: 4 }, { code: "Elective", name: "Restricted elective (choose 1 of 2)", credits: 4, alts: ["JRNL 5400", "JRNL 5480"] }, { code: "Elective", name: "Any additional JRNL or PREL course", credits: 4, alts: ["JRNL*", "PREL*"] }] },
  { id: "playwriting", name: "Playwriting", college: "CAMD", totalCredits: 16, requirements: [{ code: "THTR 1101", name: "Introduction to Theatre", credits: 4 }, { code: "THTR 2330", name: "Playwriting", credits: 4 }, { code: "Elective", name: "Playwriting elective (choose 2 of 13)", credits: 4, alts: ["COMM 1511", "ENGL 1600", "INAM 1300", "INAM 2000", "MSCR 3389", "THTR 1400", "THTR 2200", "THTR 2335", "THTR 2500", "THTR 3100", "THTR 3200", "THTR 3325", "THTR 5300"] }, { code: "Elective", name: "Playwriting elective (choose 2 of 13)", credits: 4, alts: ["COMM 1511", "ENGL 1600", "INAM 1300", "INAM 2000", "MSCR 3389", "THTR 1400", "THTR 2200", "THTR 2335", "THTR 2500", "THTR 3100", "THTR 3200", "THTR 3325", "THTR 5300"] }] },
  { id: "global-fashion", name: "Global Fashion Studies", college: "CAMD", totalCredits: 16, requirements: [{ code: "THTR 1236", name: "Introduction to Global Fashion Studies", credits: 4, alts: ["THTR 1237"] }, { code: "Elective", name: "Fashion elective (choose 2 of 7)", credits: 4, alts: ["THTR 1230", "THTR 1233", "THTR 1235", "THTR 1240", "THTR 2242", "THTR 2385", "THTR 3350"] }, { code: "Elective", name: "Fashion elective (choose 2 of 7)", credits: 4, alts: ["THTR 1230", "THTR 1233", "THTR 1235", "THTR 1240", "THTR 2242", "THTR 2385", "THTR 3350"] }, { code: "Elective", name: "Fashion or related elective (choose 1)", credits: 4, alts: ["THTR 1230", "THTR 1233", "THTR 1235", "THTR 1240", "THTR 2242", "THTR 2385", "THTR 3350", "ARTD 2360", "ARTG 1270", "ARTG 2262", "COMM 3445", "COMM 3451", "JRNL 5310", "PREL 1425", "THTR 2380"] }] },
  { id: "urban-landscape", name: "Urban Landscape Studies", college: "CAMD", totalCredits: 16, requirements: [{ code: "LARC 2340", name: "Cities, Landscape, and Contemporary Culture", credits: 4 }, { code: "Elective", name: "Urban landscape core (choose 2 of 3)", credits: 4, alts: ["LARC 2230", "LARC 2330", "LARC 2430"] }, { code: "Elective", name: "Urban landscape core (choose 2 of 3)", credits: 4, alts: ["LARC 2230", "LARC 2330", "LARC 2430"] }, { code: "Elective", name: "Urban landscape elective (choose 1 of 14)", credits: 4, alts: ["ARCH 1310", "ARCH 3352", "ARCH 4850", "CIVE 2334", "ENVR 1200", "ENVR 3200", "LARC 2230", "LARC 2240", "LARC 2330", "LARC 2430", "LARC 2440", "LARC 5210", "POLS 2395", "SOCL 1246"] }] },
];

// ─── Helpers ───────────────────────────────────────────────────────────────
// Requests go to our own back end (server.py), which holds the API key
// and chooses the model, so no secrets ever reach the browser.
const API_URL = "http://localhost:8000/api/claude";

const callClaude = async (messages, maxTokens = 4000) => {
  const res = await fetch(API_URL, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ max_tokens: maxTokens, messages }),
  });
  if (!res.ok) throw new Error(`API request failed (${res.status})`);
  const data = await res.json();
  return data.content?.map(b => b.text || "").join("") || "";
};

const parseJSON = str => {
  const stripped = str.replace(/```json|```/gi, "").trim();
  const m = stripped.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("No JSON found");
  return JSON.parse(m[0]);
};

const normalizeCode = s =>
  s.toUpperCase().replace(/\s+/g, "").replace(/H$/, "").replace(/\.\d+$/, "").trim();

// Northeastern rule: at most 50% of the credits required for a minor can be
// double counted from the major (or transfer / advanced standing credit).
const MAX_OVERLAP_SHARE = 0.5;

// A requirement can be one course, one course with alternatives ("alts"), or an
// elective slot that any listed course satisfies. "JRNL*" means any JRNL course.
const optionsOf = r => [r.code, ...(r.alts || [])];
const RANGE = /^([A-Z]+)\s*(\d{4})-(\d{4})$/;
const optionMatches = (opt, code) => {
  if (opt.endsWith("*")) return code.startsWith(normalizeCode(opt.slice(0, -1)));
  const range = opt.match(RANGE);
  if (range) {
    const m = code.match(/^([A-Z]+)(\d{4})$/);
    return !!m && m[1] === range[1] && +m[2] >= +range[2] && +m[2] <= +range[3];
  }
  return normalizeCode(opt) === code;
};
// Fill the most specific requirements first so a course isn't spent on a broad
// elective slot when a required course needed it.
const specificity = r => !r.alts ? 0 : r.alts.some(a => a.endsWith("*") || RANGE.test(a)) ? 2 : 1;

const computeOverlap = (codes, minor) => {
  const done = codes.map(normalizeCode);
  const original = new Map(codes.map(c => [normalizeCode(c), c]));
  const taken = new Set();
  const satisfiedBy = new Map();
  [...minor.requirements].sort((a, b) => specificity(a) - specificity(b)).forEach(r => {
    const hit = done.find(c => !taken.has(c) && optionsOf(r).some(o => optionMatches(o, c)));
    if (hit) { taken.add(hit); satisfiedBy.set(r, original.get(hit)); }
  });
  const allMatched = minor.requirements.filter(r => satisfiedBy.has(r));
  const capCredits = minor.totalCredits * MAX_OVERLAP_SHARE;
  // Apply the highest-credit matches first, skipping any course that would push
  // the total past the cap, so the student gets as much credit as the rule allows.
  const ranked = [...allMatched].sort((a, b) => b.credits - a.credits);
  const matched = [];
  const overLimit = [];
  let used = 0;
  for (const r of ranked) {
    if (used + r.credits <= capCredits) { matched.push(r); used += r.credits; }
    else overLimit.push(r);
  }
  const matchedCredits = used;
  const remaining = minor.requirements.filter(r => !matched.includes(r));
  const remainingCredits = remaining.reduce((s, r) => s + r.credits, 0);
  const pct = Math.round((matchedCredits / minor.totalCredits) * 100);
  return { matched, matchedCredits, remaining, remainingCredits, pct, overLimit, capCredits, satisfiedBy };
};

// ─── Styles ────────────────────────────────────────────────────────────────
// Visual idea: each minor is a transit line and each required course is a stop.
// Filled stops are courses you've already taken.
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Overpass:wght@400;600;800&display=swap');
.nw{--bg:#EDF0F3;--surface:#FFFFFF;--ink:#17202B;--muted:#5B6675;--line:#D3D9E0;--route:#00843D;--route-soft:#DCEFE3;--amber:#7A5300;--amber-soft:#FBEFCF;--blue:#1F4E8C;--blue-soft:#E1EAF6;--warn:#B42318;--focus:#1F5FBF;
  font-family:'Overpass',system-ui,-apple-system,'Segoe UI',sans-serif;background:var(--bg);color:var(--ink);min-height:100vh;line-height:1.5;font-size:16px}
@media (prefers-color-scheme: dark){.nw{--bg:#12171D;--surface:#1A2129;--ink:#E7ECF1;--muted:#9AA6B4;--line:#2E3946;--route:#34B26C;--route-soft:#173326;--amber:#F2C45A;--amber-soft:#3A2F12;--blue:#8DB4EC;--blue-soft:#1A2A40;--warn:#F97066;--focus:#7FB0FF;color-scheme:dark}}
.nw *{box-sizing:border-box}
:where(.nw) button{font-family:inherit;font-size:inherit;line-height:inherit;color:inherit;cursor:pointer}
.nw :focus-visible{outline:2px solid var(--focus);outline-offset:2px}
.wrap{max-width:780px;margin:0 auto;padding:40px 20px 64px}
.top{background:var(--surface);border-bottom:1px solid var(--line)}
.top-in{max-width:780px;margin:0 auto;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
.mark{display:flex;align-items:center;gap:10px;background:none;border:0;padding:0;font-weight:800;font-size:20px;letter-spacing:-.01em}
.navlink{background:none;border:0;padding:6px 2px;margin-left:18px;color:var(--muted);font-weight:600;border-bottom:3px solid transparent}
.navlink:hover{color:var(--ink)}
.navlink.on{color:var(--ink);border-bottom-color:var(--route)}
h1.title{font-size:clamp(30px,5vw,44px);line-height:1.1;font-weight:800;letter-spacing:-.02em;margin:0 0 14px;max-width:16ch}
h1.page{font-size:28px;font-weight:800;margin:0 0 6px;letter-spacing:-.01em}
h2.sec{font-size:20px;font-weight:800;margin:0 0 6px}
.lede{color:var(--muted);font-size:18px;max-width:56ch;margin:0 0 24px}
.sub{color:var(--muted);font-size:15px;margin:0}
.panel{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:20px}
.stack>*+*{margin-top:16px}
.gap-lg>*+*{margin-top:40px}
.btn{background:var(--route);color:#fff !important;border:0;border-radius:6px;padding:12px 18px;font-weight:700;font-size:16px}
.btn:hover{filter:brightness(1.08)}
.btn:disabled{opacity:.55;cursor:wait}
.btn.full{width:100%}
.btn-quiet{background:transparent;border:1px solid var(--line);border-radius:6px;padding:11px 16px;font-weight:600}
.btn-quiet:hover{border-color:var(--muted)}
.drop{width:100%;border:2px dashed var(--line);background:transparent;border-radius:8px;padding:14px;font-weight:600;color:var(--route)}
.drop:hover{border-color:var(--route)}
.or{text-align:center;color:var(--muted);font-size:13px;margin:8px 0}
.field{width:100%;border:1px solid var(--line);background:var(--surface);color:var(--ink);border-radius:6px;padding:10px 12px;font:inherit;font-size:15px}
textarea.field{height:160px;resize:vertical;font-size:13px;line-height:1.45}
.lbl{display:block;font-weight:700;font-size:15px;margin-bottom:2px}
.opt{font-weight:400;color:var(--muted)}
.hint{font-size:13px;color:var(--muted);margin:0 0 8px}
.err{color:var(--warn);font-size:14px;margin:0}
.stats{display:flex;flex-wrap:wrap;gap:0;margin:12px 0 14px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.stat{flex:1 1 140px;padding:12px 16px 10px 0}
.stat+.stat{padding-left:16px;border-left:1px solid var(--line)}
.stat b{display:block;font-size:26px;font-weight:800;line-height:1.1}
.stat span{font-size:13px;color:var(--muted)}
.meta p{margin:2px 0;font-size:14px}
.tag{display:inline-block;font-size:12px;font-weight:700;padding:1px 7px;border-radius:4px;border:1px solid var(--line);background:var(--surface);color:var(--muted);white-space:nowrap}
.tag.green,.tag.amber,.tag.blue{border-color:transparent}
.tag.green{background:var(--route-soft);color:var(--route)}
.tag.amber{background:var(--amber-soft);color:var(--amber)}
.tag.blue{background:var(--blue-soft);color:var(--blue)}
.rows{border-top:1px solid var(--line)}
.row{border-bottom:1px solid var(--line)}
.row-head{width:100%;text-align:left;background:none;border:0;padding:16px 4px;display:block}
.row-head:hover .row-name{color:var(--route)}
.row-top{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
.row-name{font-weight:800;font-size:17px}
.rank{color:var(--muted);font-weight:600;margin-right:8px;font-variant-numeric:tabular-nums}
.tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:4px}
.seg{display:inline-flex;border:1px solid var(--line);border-radius:8px;overflow:hidden;margin:4px 0 12px}
.seg button{font:inherit;font-size:14px;font-weight:700;padding:8px 14px;border:0;background:var(--surface);color:var(--muted);cursor:pointer}
.seg button + button{border-left:1px solid var(--line)}
.seg button[aria-pressed="true"]{background:var(--route-soft);color:var(--route)}
.seg button:disabled{cursor:not-allowed;opacity:.5}
.seg button:focus-visible{outline:2px solid var(--focus);outline-offset:-2px}
.pct{font-size:26px;font-weight:800;line-height:1;text-align:right;font-variant-numeric:tabular-nums}
.pct small{display:block;font-size:12px;font-weight:600;color:var(--muted);margin-top:4px}
.credits{font-size:14px;color:var(--muted);margin-top:2px}
.why{font-size:15px;margin:8px 0 0;padding-left:12px;border-left:3px solid var(--route-soft)}
.toggle{font-size:14px;font-weight:700;color:var(--route);margin-top:8px;display:inline-block}
.route{position:relative;display:flex;justify-content:space-between;align-items:center;height:20px;margin:14px 7px 6px}
.route::before{content:"";position:absolute;left:0;right:0;top:50%;height:4px;margin-top:-2px;background:var(--line);border-radius:2px}
.route-fill{position:absolute;left:0;top:50%;height:4px;margin-top:-2px;background:var(--route);border-radius:2px;transition:width .5s ease}
.stop{position:relative;z-index:1;width:16px;height:16px;border-radius:50%;border:3px solid var(--line);background:var(--surface)}
.stop.done{border-color:var(--route);background:var(--route)}
.stop.over{border-color:var(--route);border-style:dashed}
.stoplist{list-style:none;margin:0 0 16px 12px;padding:0;position:relative}
.stoplist::before{content:"";position:absolute;left:7px;top:10px;bottom:10px;width:4px;background:var(--line);border-radius:2px}
.stoplist li{position:relative;display:flex;justify-content:space-between;gap:12px;padding:6px 4px 6px 32px;font-size:14px}
.stoplist li::before{content:"";position:absolute;left:0;top:50%;margin-top:-9px;width:18px;height:18px;border-radius:50%;border:3px solid var(--line);background:var(--surface);box-sizing:border-box}
.stoplist li.done::before{border-color:var(--route);background:var(--route)}
.stoplist li.over::before{border-color:var(--route);border-style:dashed}
.over-note{color:var(--muted);font-size:13px}
.stoplist li.done{color:var(--ink)}
.stoplist li:not(.done){color:var(--muted)}
.code{font-weight:700;margin-right:6px;color:var(--ink)}
.steps{list-style:none;margin:0;padding:0;position:relative}
.steps::before{content:"";position:absolute;left:9px;top:14px;bottom:40px;width:4px;background:var(--route);border-radius:2px}
.steps li{position:relative;padding:4px 0 18px 40px}
.steps li::before{content:"";position:absolute;left:0;top:6px;width:22px;height:22px;border-radius:50%;border:4px solid var(--route);background:var(--surface);box-sizing:border-box}
.steps b{display:block;font-size:16px}
.steps span{font-size:15px;color:var(--muted)}
.tools .row{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:16px 4px}
.tools h3{margin:0;font-size:17px;font-weight:800}
.tools p{margin:2px 0 0;font-size:15px;color:var(--muted);max-width:52ch}
.soon{font-size:14px;color:var(--muted);white-space:nowrap}
.example{margin-top:28px}
.example-cap{font-size:13px;color:var(--muted);margin-bottom:2px}
.detail{padding:4px 4px 18px}
.detail h4{font-size:14px;font-weight:800;margin:14px 0 4px}
.detail p{font-size:15px;margin:0}
.detail ul{margin:0;padding-left:20px;font-size:15px}
.detail li{margin:2px 0}
.chips{display:flex;flex-wrap:wrap;gap:6px}
.note{background:var(--bg);border-radius:6px;padding:10px 12px;margin-top:12px}
.co-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
.co{border:1px solid var(--line);border-radius:6px;padding:12px}
.co b{display:block;font-size:15px}
.co span{font-size:14px;color:var(--muted)}
.skill{display:flex;gap:8px;align-items:flex-start;margin:6px 0}
.foot{font-size:13px;color:var(--muted);padding:24px 0 0;border-top:1px solid var(--line);margin-top:48px}
.loading{font-size:14px;color:var(--muted);padding:12px 0}
@media (max-width:560px){.navlink{margin-left:12px}.tools .row{flex-direction:column;align-items:flex-start}}
@media (prefers-reduced-motion: reduce){.route-fill{transition:none}}
`;

// ─── Shared pieces ─────────────────────────────────────────────────────────
const RouteGlyph = () => (
  <svg width="30" height="14" viewBox="0 0 30 14" aria-hidden="true">
    <rect x="2" y="5" width="26" height="4" rx="2" fill="var(--route)" />
    <circle cx="5" cy="7" r="4.5" fill="var(--route)" />
    <circle cx="25" cy="7" r="4" fill="var(--surface)" stroke="var(--route)" strokeWidth="3" />
  </svg>
);

// Draws a minor as a line of stops; finished courses are listed first so the filled segment reads as progress.
const Route = ({ requirements, isDone, isOver = () => false }) => {
  const rank = r => isDone(r) ? 2 : isOver(r) ? 1 : 0;
  const stops = [...requirements].sort((a, b) => rank(b) - rank(a));
  const doneCount = stops.filter(isDone).length;
  const fill = stops.length > 1 && doneCount > 0 ? ((doneCount - 1) / (stops.length - 1)) * 100 : 0;
  return (
    <div className="route" role="img" aria-label={`${doneCount} of ${stops.length} required courses completed`}>
      <div className="route-fill" style={{ width: `${fill}%` }} />
      {stops.map((r, i) => <span key={i} className={`stop ${isDone(r) ? "done" : isOver(r) ? "over" : ""}`} title={`${r.code} ${r.name}`} />)}
    </div>
  );
};

const Nav = ({ page, setPage }) => (
  <header className="top">
    <div className="top-in">
      <button className="mark" onClick={() => setPage("home")}><RouteGlyph />NU-Way</button>
      <nav>
        {[{ id: "home", label: "Home" }, { id: "minor-finder", label: "Minor finder" }, { id: "career-explorer", label: "Career explorer" }].map(({ id, label }) => (
          <button key={id} onClick={() => setPage(id)} className={`navlink ${page === id ? "on" : ""}`} aria-current={page === id ? "page" : undefined}>{label}</button>
        ))}
      </nav>
    </div>
  </header>
);

// ─── Home Page ─────────────────────────────────────────────────────────────
const SAMPLE = {
  name: "Mathematics",
  requirements: [
    { code: "MATH 1341", name: "Calculus 1 for Science and Engineering", done: true },
    { code: "MATH 1342", name: "Calculus 2 for Science and Engineering", done: true },
    { code: "MATH 2331", name: "Linear Algebra", done: true },
    { code: "MATH 2321", name: "Calculus 3 for Science and Engineering", done: false },
    { code: "MATH 3001–4699", name: "Mathematics elective", done: false },
    { code: "MATH 3001–4699", name: "Mathematics elective", done: false },
  ],
};

const FEATURES = [
  { title: "Minor finder", desc: "Upload your degree audit and see which minors overlap most with courses you’ve already taken.", page: "minor-finder", cta: "Find minors" },
  { title: "Career explorer", desc: "See which industries and roles your major sets you up for, with a roadmap for each one.", page: "career-explorer", cta: "Explore careers" },
  { title: "Graduation planner", desc: "Map out your remaining semesters, co-ops, and course load.", page: null, cta: "In progress" },
];

const HomePage = ({ setPage }) => (
  <div className="wrap gap-lg">
    <section>
      <h1 className="title">See which minors you’re already partway through.</h1>
      <p className="lede">Add your Northeastern degree audit. NU-Way matches your courses against more than 100 minors and shows exactly what’s left for each one.</p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button className="btn" onClick={() => setPage("minor-finder")}>Add your audit</button>
        <button className="btn-quiet" onClick={() => setPage("career-explorer")}>Explore careers</button>
      </div>
      <div className="panel example">
        <p className="example-cap">Example result</p>
        <div className="row-top">
          <div><span className="row-name">{SAMPLE.name}</span><div className="credits">3 of 6 courses done</div></div>
          <span className="tag green">Good fit</span>
        </div>
        <Route requirements={SAMPLE.requirements} isDone={r => r.done} />
      </div>
    </section>

    <section>
      <h2 className="sec" style={{ marginBottom: 16 }}>How it works</h2>
      <ol className="steps">
        <li><b>Add your audit</b><span>Upload the PDF from myNEU or paste the text.</span></li>
        <li><b>NU-Way reads it</b><span>Claude extracts your major, courses, and credits into structured data.</span></li>
        <li><b>Compare minors</b><span>Minors are ranked by credit overlap, with minors from your home college left out and the 50% overlap limit applied.</span></li>
      </ol>
    </section>

    <section className="tools">
      <h2 className="sec" style={{ marginBottom: 12 }}>Tools</h2>
      <div className="rows">
        {FEATURES.map(({ title, desc, page, cta }) => (
          <div key={title} className="row">
            <div><h3>{title}</h3><p>{desc}</p></div>
            {page ? <button className="btn-quiet" onClick={() => setPage(page)}>{cta}</button> : <span className="soon">{cta}</span>}
          </div>
        ))}
      </div>
    </section>

    <p className="foot">NU-Way is an unofficial student project and is not affiliated with Northeastern University.</p>
  </div>
);

// ─── Minor Finder Page ─────────────────────────────────────────────────────
// Highest interest score first; ties go to the minor with more credit overlap.
const sortByInterest = rows =>
  [...rows].sort((a, b) => (b.relevance ?? -1) - (a.relevance ?? -1) || b.overlap.pct - a.overlap.pct);

const MinorCard = ({ minor, overlap, rank, aiSummary, relevance }) => {
  const [expanded, setExpanded] = useState(false);
  const tone = overlap.pct >= 60 ? "green" : overlap.pct >= 30 ? "amber" : "";
  const fitLabel = overlap.pct >= 60 ? "Great fit" : overlap.pct >= 30 ? "Good fit" : "Some overlap";
  const isDone = r => overlap.matched.includes(r);
  const isOver = r => overlap.overLimit.includes(r);
  const rankOf = r => isDone(r) ? 2 : isOver(r) ? 1 : 0;
  const sorted = [...minor.requirements].sort((a, b) => rankOf(b) - rankOf(a));
  return (
    <div className="row">
      <button className="row-head" onClick={() => setExpanded(e => !e)} aria-expanded={expanded}>
        <div className="row-top">
          <div>
            <span className="rank">{rank}</span><span className="row-name">{minor.name}</span>
            <div className="tags"><span className="tag">{minor.college}</span><span className={`tag ${tone}`}>{fitLabel}</span>{relevance >= 7 && <span className="tag blue">Matches your interests</span>}</div>
          </div>
          <div className="pct">{overlap.pct}%<small>overlap</small></div>
        </div>
        <Route requirements={minor.requirements} isDone={isDone} isOver={isOver} />
        <div className="credits">{overlap.matchedCredits} credits done, {overlap.remainingCredits} to go, {minor.totalCredits} total</div>
        {overlap.overLimit.length > 0 && <div className="credits">Overlap limit applied: up to {overlap.capCredits} of this minor’s {minor.totalCredits} credits can come from your major, so {overlap.overLimit.length} matching {overlap.overLimit.length === 1 ? "course doesn’t" : "courses don’t"} count.</div>}
        {aiSummary && <p className="why">{aiSummary}</p>}
        <span className="toggle">{expanded ? "Hide courses" : "Show courses"}</span>
      </button>
      {expanded && (
        <ul className="stoplist">
          {sorted.map((r, i) => (
            <li key={i} className={isDone(r) ? "done" : isOver(r) ? "over" : ""}>
              <span><span className="code">{overlap.satisfiedBy.get(r) || r.code}</span>{r.name}{isOver(r) && <span className="over-note"> (taken, but over the 50% overlap limit)</span>}</span>
              <span>{r.credits} cr</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const MinorFinderPage = () => {
  const [auditText, setAuditText] = useState("");
  const [careerInterests, setCareerInterests] = useState("");
  const [parsedData, setParsedData] = useState(null);
  const [minorResults, setMinorResults] = useState([]);
  const [sortMode, setSortMode] = useState("credits");
  const [interestsUsed, setInterestsUsed] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef();
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result.split(",")[1];
        setLoadingMsg("Reading PDF..."); setLoading(true);
        try {
          const text = await callClaude([{ role: "user", content: [{ type: "document", source: { type: "base64", media_type: "application/pdf", data: base64 } }, { type: "text", text: "Extract all the text from this degree audit and return it as plain text." }] }]);
          setAuditText(text);
        } catch { setError("Failed to read PDF."); }
        setLoading(false); setLoadingMsg("");
      };
      reader.readAsDataURL(file);
    } else { setAuditText(await file.text()); }
  };

  const analyze = async () => {
    if (!auditText.trim()) { setError("Please paste your audit or upload a file."); return; }
    setError(""); setLoading(true); setParsedData(null); setMinorResults([]);
    try {
      setLoadingMsg("Parsing your degree audit...");
      const parseResp = await callClaude([{ role: "user", content: `You are parsing a Northeastern University degree audit. Extract:
1. Student's major(s)
2. The home college of their major
3. All completed courses (course code + name + credits)
4. All in-progress or future planned courses
5. Total completed credits

The homeCollege must be one of these exact values based on the student's major:
- "Khoury" (Computer Science, Data Science, Cybersecurity, Information Science)
- "COS" (Biology, Chemistry, Physics, Mathematics, Biochemistry, Environmental Science, Marine Biology)
- "D'Amore-McKim" (Business Administration, Finance, Accounting, Marketing, Management, Entrepreneurship, Supply Chain)
- "CSSH" (Political Science, History, Psychology, Sociology, Economics, Communication, Philosophy, English, Linguistics, Criminal Justice, International Affairs)
- "Bouvé" (Nursing, Pharmacy, Health Science, Physical Therapy, Speech-Language Pathology, Physician Assistant)
- "CAMD" (Architecture, Art, Design, Music, Theater, Film, Game Design, Journalism, Media)
- "COE" (Electrical Engineering, Mechanical Engineering, Civil Engineering, Chemical Engineering, Industrial Engineering, Computer Engineering, Bioengineering)

Return ONLY valid JSON, no markdown:
{"major":"string","homeCollege":"string","completedCourses":[{"code":"CS 2500","name":"Fundamentals of CS 1","credits":4}],"inProgressCourses":[{"code":"CS 3500","name":"OOD","credits":4}],"totalCredits":64}

Degree audit:
${auditText.slice(0, 15000)}` }]);

      let parsed;
      try {
        parsed = parseJSON(parseResp);
        if (!parsed.major) throw new Error("Major not found.");
        parsed.completedCourses = parsed.completedCourses || [];
        parsed.inProgressCourses = parsed.inProgressCourses || [];
        parsed.totalCredits = parsed.totalCredits || parsed.completedCourses.reduce((s, c) => s + (c.credits || 0), 0);
        parsed.homeCollege = parsed.homeCollege || "Unknown";
      } catch (e) { throw new Error(`Could not parse audit: ${e.message}`); }
      setParsedData(parsed);

      setLoadingMsg("Computing credit overlaps...");
      const allCodes = [...parsed.completedCourses.map(c => c.code), ...parsed.inProgressCourses.map(c => c.code)];
      const norm = s => s.toLowerCase().replace(/[^a-z]/g, "");
      const home = norm(parsed.homeCollege);
      const ALIASES = { khoury: ["khoury","computerscience","computersci"], cos: ["cos","collegeofscience","scienc"], dmore: ["damore","damoremckim","business","dmsb"], cssh: ["cssh","socialscience","humanit","socialsci"], bouv: ["bouv","bouve","healthsci","healthscience"], camd: ["camd","artsmedia","artsmediadesign","artsmed"], coe: ["coe","engineering","collegeofengineering"] };
      const MINOR_MAP = { "Khoury": "khoury", "COS": "cos", "D'Amore-McKim": "dmore", "CSSH": "cssh", "Bouvé": "bouv", "CAMD": "camd", "COE": "coe" };
          let studentKey = null;
      for (const [key, aliases] of Object.entries(ALIASES)) {
        if (aliases.some(a => home.includes(a) || a.includes(home.slice(0, 6)))) { studentKey = key; break; }
      }
      const majorText = (parsed.major || "").toLowerCase();
      const eligible = NU_MINORS.filter(m =>
        (!studentKey || MINOR_MAP[m.college] !== studentKey) &&
        !(m.restrictedMajors || []).some(word => majorText.includes(word)));
      const overlaps = eligible.map(minor => ({ minor, overlap: computeOverlap(allCodes, minor) })).sort((a, b) => b.overlap.pct - a.overlap.pct);

      // Interest fit is a judgment call, so Claude scores it; credit overlap stays deterministic.
      const interests = careerInterests.trim();
      let relevance = {};
      if (interests) {
        setLoadingMsg("Matching minors to your interests...");
        const relResp = await callClaude([{ role: "user", content: `A student is interested in: ${interests}.

Rate how relevant each minor's subject is to these interests, from 0 (unrelated) to 10 (directly relevant). Judge only the subject, not the student's progress.

Minors:
${overlaps.map(r => `${r.minor.id}: ${r.minor.name}`).join("\n")}

Return ONLY a JSON object mapping each id to a number, for example {"biochem": 8}` }]);
        try { const m = relResp.replace(/```json|```/gi, "").match(/\{[\s\S]*\}/); relevance = m ? JSON.parse(m[0]) : {}; } catch { relevance = {}; }
      }
      const withRelevance = overlaps.map(r => ({ ...r, relevance: typeof relevance[r.minor.id] === "number" ? relevance[r.minor.id] : null }));
      const hasRelevance = withRelevance.some(r => r.relevance !== null);

      // Write recommendations for the top 5 in each ordering, so both views have them.
      setLoadingMsg("Generating AI recommendations...");
      const featured = [...withRelevance.slice(0, 5), ...(hasRelevance ? sortByInterest(withRelevance).slice(0, 5) : [])]
        .filter((r, i, arr) => arr.indexOf(r) === i);
      const careerCtx = interests ? `Career interests: ${interests}.` : "";
      const summaryResp = await callClaude([{ role: "user", content: `A Northeastern student majoring in ${parsed.major} has completed ${parsed.totalCredits} credits. Courses: ${allCodes.slice(0, 20).join(", ")}. ${careerCtx}

For each minor, write a 1-sentence recommendation factoring in their background and career interests if provided.

Minors:
${featured.map((r, i) => `${i + 1}. ${r.minor.name} (${r.overlap.pct}% overlap, ${r.overlap.remainingCredits} cr needed)`).join("\n")}

Return ONLY a JSON array of ${featured.length} strings, in the same order.` }]);

      let summaries = [];
      try { const m = summaryResp.replace(/```json|```/gi, "").trim().match(/\[[\s\S]*\]/); summaries = m ? JSON.parse(m[0]) : []; } catch { summaries = []; }
      const summaryFor = new Map(featured.map((r, i) => [r.minor, summaries[i] || ""]));
      setMinorResults(withRelevance.map(r => ({ ...r, aiSummary: summaryFor.get(r.minor) || "" })));
      setInterestsUsed(hasRelevance ? interests : "");
      setSortMode("credits");
    } catch (err) { setError(err.message || "Something went wrong."); }
    setLoading(false); setLoadingMsg("");
  };

  return (
    <div className="wrap stack">
      <div>
        <h1 className="page">Minor finder</h1>
        <p className="sub">Upload or paste your degree audit to find the minors you have the most credit toward.</p>
      </div>
      <div className="panel stack">
        <div>
          <button onClick={() => fileRef.current.click()} className="drop">Upload a PDF or text file</button>
          <input ref={fileRef} type="file" accept=".pdf,.txt" style={{ display: "none" }} onChange={handleFile} />
          <p className="or">or paste the text below</p>
          <textarea value={auditText} onChange={e => setAuditText(e.target.value)} aria-label="Degree audit text" placeholder="Paste your Northeastern degree audit here" className="field" />
        </div>
        <div>
          <label className="lbl" htmlFor="interests">Career interests <span className="opt">(optional)</span></label>
          <p className="hint">Claude will factor these into the minor recommendations.</p>
          <input id="interests" value={careerInterests} onChange={e => setCareerInterests(e.target.value)} placeholder="For example: biotech consulting, product management, climate policy" className="field" />
        </div>
        {error && <p className="err" role="alert">{error}</p>}
        <button onClick={analyze} disabled={loading} className="btn full">{loading ? loadingMsg : "Analyze audit"}</button>
      </div>

      {parsedData && (
        <div className="panel">
          <h2 className="sec">Audit summary</h2>
          <div className="stats">
            <div className="stat"><b>{parsedData.totalCredits}</b><span>credits completed</span></div>
            <div className="stat"><b>{parsedData.completedCourses?.length || 0}</b><span>courses completed</span></div>
            <div className="stat"><b>{parsedData.inProgressCourses?.length || 0}</b><span>in progress or planned</span></div>
          </div>
          <div className="meta">
            <p><b>Major:</b> {parsedData.major}</p>
            <p><b>Home college:</b> {parsedData.homeCollege}</p>
            <p className="hint" style={{ margin: "6px 0 0" }}>Minors from {parsedData.homeCollege} are left out.</p>
            {careerInterests.trim() && <p className="hint" style={{ margin: 0 }}>Tailored to: {careerInterests.trim()}</p>}
          </div>
        </div>
      )}

      {minorResults.length > 0 && (
        <section>
          <h2 className="sec">{sortMode === "interests" ? "Minors ranked by fit with your interests" : "Minors ranked by credit overlap"}</h2>
          <div className="seg" role="group" aria-label="Sort minors">
            <button type="button" aria-pressed={sortMode === "credits"} onClick={() => setSortMode("credits")}>Most credit overlap</button>
            <button type="button" aria-pressed={sortMode === "interests"} disabled={!interestsUsed} onClick={() => setSortMode("interests")}>Best match for your interests</button>
          </div>
          {!interestsUsed && <p className="hint" style={{ marginBottom: 12 }}>Add career interests above and analyze again to sort by them.</p>}
          <p className="sub" style={{ marginBottom: 12 }}>Filled stops are courses that count toward the minor. Dashed stops are courses you’ve taken that can’t count, because at most 50% of a minor’s credits can be double counted from your major. Select a minor to see its courses.</p>
          <div className="rows">
            {(sortMode === "interests" ? sortByInterest(minorResults) : minorResults).map((r, i) => <MinorCard key={`${r.minor.id}-${r.minor.college}`} rank={i + 1} minor={r.minor} overlap={r.overlap} aiSummary={r.aiSummary} relevance={r.relevance} />)}
          </div>
        </section>
      )}
    </div>
  );
};

// ─── Career Explorer Page ──────────────────────────────────────────────────
const fitTone = f => f === "high" ? "green" : f === "medium" ? "amber" : "";
const typeTone = t => t === "internship" ? "blue" : t === "co-op" ? "green" : "amber";
const skillTone = l => l === "expert" ? "green" : l === "strengthen" ? "amber" : "blue";

const IndustryRow = ({ ind, major, year }) => {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (detail) { setOpen(o => !o); return; }
    setOpen(true); setLoading(true);
    try {
      const resp = await callClaude([{ role: "user", content: `You are a Northeastern University career advisor. A ${year || "college"} student majoring in ${major} is interested in the ${ind.name} industry.

Return ONLY valid JSON, no markdown:
{
  "overview": "2-3 sentence overview for someone with their major",
  "whatNUGradsDo": ["role/function 1", "role/function 2", "role/function 3"],
  "topCompanies": ["Co A", "Co B", "Co C", "Co D", "Co E"],
  "keySkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "howMajorFits": "2 sentences connecting their major to this industry",
  "nuSpecificTip": "1 actionable NU-specific tip mentioning co-op, Handshake, or clubs"
}` }]);
      setDetail(parseJSON(resp));
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="row">
      <button onClick={load} className="row-head" aria-expanded={open}>
        <div className="row-top">
          <div><span className="row-name">{ind.name}</span><div className="credits">{ind.reason}</div></div>
          <span className={`tag ${fitTone(ind.fit)}`}>{ind.fit} fit</span>
        </div>
        <span className="toggle">{open ? "Hide details" : "Show details"}</span>
      </button>
      {open && (
        <div className="detail">
          {loading ? <p className="loading">Loading industry details…</p> : !detail ? <p className="err">Couldn’t load these details. Select the industry again to retry.</p> : (
            <>
              <p>{detail.overview}</p>
              <h4>What Northeastern grads do here</h4>
              <ul>{detail.whatNUGradsDo?.map((r, i) => <li key={i}>{r}</li>)}</ul>
              <h4>Companies</h4>
              <div className="chips">{detail.topCompanies?.map((c, i) => <span key={i} className="tag">{c}</span>)}</div>
              <h4>Key skills</h4>
              <div className="chips">{detail.keySkills?.map((s, i) => <span key={i} className="tag green">{s}</span>)}</div>
              <div className="note"><h4 style={{ marginTop: 0 }}>How your major fits</h4><p>{detail.howMajorFits}</p></div>
              <div className="note"><h4 style={{ marginTop: 0 }}>Northeastern tip</h4><p>{detail.nuSpecificTip}</p></div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const RoleRow = ({ role, major, year }) => {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (detail) { setOpen(o => !o); return; }
    setOpen(true); setLoading(true);
    try {
      const resp = await callClaude([{ role: "user", content: `You are a Northeastern University career advisor. A ${year || "college"} student majoring in ${major} is interested in the role: ${role.title}.

Return ONLY valid JSON, no markdown:
{
  "overview": "2 sentence day-to-day description of this role",
  "timeline": "Realistic timeline for a ${major} student to land this role",
  "thisSemester": ["Action 1", "Action 2", "Action 3"],
  "skills": [{"name":"string","level":"learn|strengthen|expert","how":"how to build it"}],
  "resumeTips": ["Tip 1", "Tip 2", "Tip 3"],
  "salaryRange": "Typical US internship/co-op or entry salary range"
}` }]);
      setDetail(parseJSON(resp));
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="row">
      <button onClick={load} className="row-head" aria-expanded={open}>
        <div className="row-top">
          <div><span className="row-name">{role.title}</span><div className="credits">{role.reason}</div></div>
          <span className={`tag ${typeTone(role.type)}`}>{role.type}</span>
        </div>
        <span className="toggle">{open ? "Hide roadmap" : "Show roadmap"}</span>
      </button>
      {open && (
        <div className="detail">
          {loading ? <p className="loading">Loading role roadmap…</p> : !detail ? <p className="err">Couldn’t load this roadmap. Select the role again to retry.</p> : (
            <>
              <p>{detail.overview}</p>
              <h4>Timeline</h4>
              <p>{detail.timeline}</p>
              <h4>This semester</h4>
              <ol style={{ margin: 0, paddingLeft: 20, fontSize: 15 }}>{detail.thisSemester?.map((a, i) => <li key={i}>{a}</li>)}</ol>
              <h4>Skills to build</h4>
              {detail.skills?.map((s, i) => (
                <div key={i} className="skill">
                  <span className={`tag ${skillTone(s.level)}`}>{s.level}</span>
                  <div><b style={{ fontSize: 15 }}>{s.name}</b><div className="credits">{s.how}</div></div>
                </div>
              ))}
              <h4>Resume tips</h4>
              <ul>{detail.resumeTips?.map((t, i) => <li key={i}>{t}</li>)}</ul>
              {detail.salaryRange && <div className="note"><h4 style={{ marginTop: 0 }}>Typical pay</h4><p>{detail.salaryRange}</p></div>}
            </>
          )}
        </div>
      )}
    </div>
  );
};

const CareerExplorerPage = () => {
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("");
  const [interests, setInterests] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async () => {
    if (!major.trim()) { setError("Please enter your major."); return; }
    setError(""); setLoading(true); setResults(null);
    try {
      const resp = await callClaude([{ role: "user", content: `You are a Northeastern University career advisor.
- Major: ${major.trim()}
- Year: ${year.trim() || "Not specified"}
- Interests: ${interests.trim() || "Not specified"}

Return ONLY valid JSON, no markdown:
{
  "industries": [{"name":"string","fit":"high|medium|low","reason":"1-2 sentences"}],
  "roles": [{"title":"string","type":"internship|full-time|co-op","reason":"1 sentence"}],
  "companies": [{"name":"string","why":"1 sentence"}],
  "tips": ["string","string","string"]
}

5 industries, 8 roles (mix of types), 6 companies, 3 NU-specific tips.` }]);
      setResults(parseJSON(resp));
    } catch (e) { console.error(e); setError("Something went wrong. Try again."); }
    setLoading(false);
  };

  return (
    <div className="wrap stack">
      <div>
        <h1 className="page">Career explorer</h1>
        <p className="sub">See which industries and roles your major sets you up for. Select any result for a full breakdown.</p>
      </div>
      <div className="panel stack">
        <div>
          <label className="lbl" htmlFor="major">Major</label>
          <input id="major" value={major} onChange={e => setMajor(e.target.value)} placeholder="For example: Computer Science, Bioengineering, Finance" className="field" />
        </div>
        <div>
          <label className="lbl" htmlFor="year">Year <span className="opt">(optional)</span></label>
          <input id="year" value={year} onChange={e => setYear(e.target.value)} placeholder="For example: second year, graduating spring 2029" className="field" />
        </div>
        <div>
          <label className="lbl" htmlFor="cinterests">Interests <span className="opt">(optional)</span></label>
          <input id="cinterests" value={interests} onChange={e => setInterests(e.target.value)} placeholder="For example: healthcare, sustainability, startups" className="field" />
        </div>
        {error && <p className="err" role="alert">{error}</p>}
        <button onClick={analyze} disabled={loading} className="btn full">{loading ? "Finding career options…" : "Explore career options"}</button>
      </div>

      {results && (
        <div className="gap-lg" style={{ marginTop: 32 }}>
          <section>
            <h2 className="sec" style={{ marginBottom: 8 }}>Industries that fit your major</h2>
            <div className="rows">{results.industries?.map((ind, i) => <IndustryRow key={i} ind={ind} major={major} year={year} />)}</div>
          </section>
          <section>
            <h2 className="sec" style={{ marginBottom: 8 }}>Roles to apply for</h2>
            <div className="rows">{results.roles?.map((role, i) => <RoleRow key={i} role={role} major={major} year={year} />)}</div>
          </section>
          <section>
            <h2 className="sec" style={{ marginBottom: 12 }}>Companies to look at</h2>
            <div className="co-grid">{results.companies?.map((co, i) => <div key={i} className="co"><b>{co.name}</b><span>{co.why}</span></div>)}</div>
          </section>
          <section className="panel">
            <h2 className="sec">Tips for Northeastern students</h2>
            <ol style={{ margin: "8px 0 0", paddingLeft: 20, fontSize: 15 }}>{results.tips?.map((tip, i) => <li key={i} style={{ margin: "4px 0" }}>{tip}</li>)}</ol>
          </section>
        </div>
      )}
    </div>
  );
};

// ─── Root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  return (
    <div className="nw">
      <style>{STYLES}</style>
      <Nav page={page} setPage={setPage} />
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "minor-finder" && <MinorFinderPage />}
      {page === "career-explorer" && <CareerExplorerPage />}
    </div>
  );
}