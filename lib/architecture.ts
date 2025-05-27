export interface Architecture {
  architecture:
    | 'Clean Architecture'
    | 'Hexagonal Architecture'
    | 'Layered Architecture'
    | 'Event-Driven Architecture'
    | 'Serverless Architecture'
    | 'Need Further Analysis';
  confidence: 'High' | 'Medium' | 'Low';
  reasons: string[];
  complexityScore?: number;
  platform?: 'Web' | 'Mobile Native' | 'Cross-Platform';
  techStack?: string[];
}

export interface CoreArchitectureResponses {
  // Core Business Requirements (8 questions)
  hasComplexDomainLogic: boolean;
  hasMultipleSystemSync: boolean;
  hasCustomWorkflows: boolean;
  isEventDriven: boolean;
  hasExternalSourceOfTruth: boolean;
  hasComplexDataValidation: boolean;
  needsFutureIntegrations: boolean;
  needsMaintainability: boolean;

  // Platform (3 questions)
  isMobileApp: boolean;
  needsCrossPlatform: boolean;
  isWebsite: boolean;

  // Scale (3 questions)
  expectsHighTraffic: boolean;
  hasLargeDatasets: boolean;
  hasGlobalUsers: boolean;

  // User Experience (2 questions)
  needsOfflineSupport: boolean;
  hasRealtimeFeatures: boolean;

  // Development (2 questions)
  hasSmallTeam: boolean;
  needsRapidDevelopment: boolean;
}

export function determineArchitecture(
  responses: CoreArchitectureResponses,
): Architecture {
  // Check for specific architecture patterns first
  if (hasServerlessIndicators(responses)) {
    return createServerlessArchitectureDecision(responses);
  }
  if (hasEventDrivenIndicators(responses)) {
    return createEventDrivenArchitectureDecision(responses);
  }
  if (hasDefinitiveCleanIndicators(responses)) {
    return createCleanArchitectureDecision('High', responses);
  }
  if (hasDefinitiveHexagonalIndicators(responses)) {
    return createHexagonalArchitectureDecision('High', responses);
  }

  const complexityScore = calculateComplexityScore(responses);

  if (complexityScore >= 2) {
    return createCleanArchitectureDecision(
      complexityScore >= 4 ? 'High' : 'Medium',
      responses,
    );
  }
  if (complexityScore <= -2) {
    return createHexagonalArchitectureDecision(
      complexityScore <= -4 ? 'High' : 'Medium',
      responses,
    );
  }

  // Default to Layered Architecture for simple cases
  return createLayeredArchitectureDecision(responses);
}

function calculateComplexityScore(
  responses: CoreArchitectureResponses,
): number {
  let score = 0;

  // Core business complexity (your original logic)
  if (responses.hasComplexDomainLogic) score += 3;
  if (responses.hasMultipleSystemSync && responses.hasCustomWorkflows)
    score += 3;
  if (responses.hasExternalSourceOfTruth && responses.isEventDriven) score -= 3;
  if (responses.hasMultipleSystemSync) score += 2;
  if (responses.needsFutureIntegrations) score += 2;
  if (responses.hasComplexDataValidation) score += 2;
  if (responses.isEventDriven) score -= 2;
  if (responses.hasExternalSourceOfTruth) score -= 2;
  if (responses.hasCustomWorkflows) score += 1;
  if (responses.needsMaintainability) score += 1;

  // Platform complexity
  if (responses.isMobileApp && !responses.needsCrossPlatform) score += 1; // Native complexity
  if (responses.needsCrossPlatform) score += 2; // Cross-platform complexity
  if (responses.isWebsite && !responses.isMobileApp) score -= 1; // Web simplicity

  // Scale complexity
  if (responses.expectsHighTraffic) score += 2;
  if (responses.hasLargeDatasets) score += 2;
  if (responses.hasGlobalUsers) score += 1;

  // User experience complexity
  if (responses.needsOfflineSupport) score += 2;
  if (responses.hasRealtimeFeatures) score += 1;

  // Development constraints (reduce complexity)
  if (responses.hasSmallTeam) score -= 2;
  if (responses.needsRapidDevelopment) score -= 1;

  return score;
}

function hasServerlessIndicators(
  responses: CoreArchitectureResponses,
): boolean {
  return (
    responses.hasSmallTeam &&
    responses.needsRapidDevelopment &&
    !responses.hasComplexDomainLogic &&
    !responses.needsOfflineSupport
  );
}

function hasEventDrivenIndicators(
  responses: CoreArchitectureResponses,
): boolean {
  return (
    responses.isEventDriven &&
    responses.hasRealtimeFeatures &&
    (responses.hasMultipleSystemSync || responses.hasExternalSourceOfTruth)
  );
}

function hasDefinitiveCleanIndicators(
  responses: CoreArchitectureResponses,
): boolean {
  return (
    (responses.hasComplexDomainLogic && responses.hasMultipleSystemSync) ||
    (responses.hasCustomWorkflows && responses.hasComplexDataValidation) ||
    (responses.needsFutureIntegrations && responses.needsMaintainability)
  );
}

function hasDefinitiveHexagonalIndicators(
  responses: CoreArchitectureResponses,
): boolean {
  return (
    (responses.hasExternalSourceOfTruth &&
      responses.isEventDriven &&
      !responses.hasComplexDomainLogic) ||
    (!responses.hasComplexDomainLogic &&
      !responses.hasCustomWorkflows &&
      responses.isEventDriven)
  );
}

function determinePlatform(
  responses: CoreArchitectureResponses,
): Architecture['platform'] {
  if (responses.isMobileApp && responses.needsCrossPlatform)
    return 'Cross-Platform';
  if (responses.isMobileApp) return 'Mobile Native';
  return 'Web';
}

function determineTechStack(responses: CoreArchitectureResponses, architecture: string): string[] {
  const stack: string[] = [];

  // Frontend - Single decisive choice
  if (responses.isMobileApp && responses.needsCrossPlatform) {
    stack.push('React Native');
  } else if (responses.isMobileApp) {
    stack.push('Native Development (Swift/Kotlin)');
  } else {
    stack.push('React/Next.js');
  }

  // Backend - Single decisive choice  
  if (architecture === 'Serverless Architecture') {
    stack.push('Serverless Functions');
  } else if (responses.hasRealtimeFeatures) {
    stack.push('Node.js with WebSockets');
  } else {
    stack.push('Node.js');
  }

  // Database - Your current logic is perfect ✅
  if (responses.isMobileApp && !responses.hasComplexDataValidation && !responses.hasLargeDatasets) {
    stack.push('Firebase');
  } else if (responses.hasLargeDatasets && !responses.hasComplexDataValidation) {
    stack.push('NoSQL Database');
  } else {
    stack.push('SQL Database');
  }

  return stack;
}

function createServerlessArchitectureDecision(
  responses: CoreArchitectureResponses,
): Architecture {
  return {
    architecture: 'Serverless Architecture',
    confidence: 'High',
    platform: determinePlatform(responses),
    techStack: determineTechStack(responses, 'Serverless Architecture'),
    reasons: [
      'serverless1',
      'serverless2',
      'serverless3',
    ],
  };
}

function createEventDrivenArchitectureDecision(
  responses: CoreArchitectureResponses,
): Architecture {
  return {
    architecture: 'Event-Driven Architecture',
    confidence: 'High',
    platform: determinePlatform(responses),
    techStack: determineTechStack(responses, 'Event-Driven Architecture'),
    reasons: [
      'eventDriven1',
      'eventDriven2',
      'eventDriven3',
    ],
  };
}

function createLayeredArchitectureDecision(
  responses: CoreArchitectureResponses,
): Architecture {
  return {
    architecture: 'Layered Architecture',
    confidence: 'Medium',
    platform: determinePlatform(responses),
    techStack: determineTechStack(responses, 'Layered Architecture'),
    reasons: [
      'layered1',
      'layered2',
      'layered3',
    ],
  };
}

function createCleanArchitectureDecision(
  confidence: 'High' | 'Medium',
  responses: CoreArchitectureResponses,
): Architecture {
  return {
    architecture: 'Clean Architecture',
    confidence,
    platform: determinePlatform(responses),
    techStack: determineTechStack(responses, 'Clean Architecture'),
    reasons: getCleanArchitectureReasons(responses),
  };
}

function createHexagonalArchitectureDecision(
  confidence: 'High' | 'Medium',
  responses: CoreArchitectureResponses,
): Architecture {
  return {
    architecture: 'Hexagonal Architecture',
    confidence,
    platform: determinePlatform(responses),
    techStack: determineTechStack(responses, 'Hexagonal Architecture'),
    reasons: getHexagonalArchitectureReasons(responses),
  };
}

function getCleanArchitectureReasons(
  responses: CoreArchitectureResponses,
): string[] {
  const reasons: string[] = [];
  if (responses.hasComplexDomainLogic) {
    reasons.push('clean1');
  }
  if (responses.hasMultipleSystemSync) {
    reasons.push('clean2');
    if (responses.hasCustomWorkflows) {
      reasons.push('clean3');
    }
  }
  if (responses.hasComplexDataValidation) {
    reasons.push('clean4');
  }
  if (responses.needsFutureIntegrations && responses.needsMaintainability) {
    reasons.push('clean5');
  }
  return reasons;
}

function getHexagonalArchitectureReasons(
  responses: CoreArchitectureResponses,
): string[] {
  const reasons: string[] = [];
  if (responses.hasExternalSourceOfTruth) {
    reasons.push('hex1');
    if (responses.isEventDriven) {
      reasons.push('hex2');
    }
  }
  if (!responses.hasComplexDomainLogic && !responses.hasCustomWorkflows) {
    reasons.push('hex3');
  }
  if (responses.isEventDriven) {
    reasons.push('hex4');
  }
  return reasons;
}

function createNeedsFurtherAnalysisDecision(
  score: number,
  responses: CoreArchitectureResponses,
): Architecture {
  return {
    architecture: 'Need Further Analysis',
    confidence: 'Low',
    platform: determinePlatform(responses),
    reasons: [
      'System requirements fall between architecture patterns',
      `Current complexity score: ${score}`,
      'Expected growth in business logic complexity',
      'Likelihood of additional system integrations',
      'Future data management needs',
    ],
    complexityScore: score,
  };
}
