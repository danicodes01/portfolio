export interface Architecture {
    architecture: 'Clean Architecture' | 'Hexagonal Architecture' | 'Need Further Analysis';
    confidence: 'High' | 'Medium' | 'Low';
    reasons: string[];
    complexityScore?: number;
}

export interface CoreArchitectureResponses {
    hasComplexDomainLogic: boolean;
    hasMultipleSystemSync: boolean;
    hasCustomWorkflows: boolean;
    isEventDriven: boolean;
    hasExternalSourceOfTruth: boolean;
    needsLocalDataStore: boolean;
    hasComplexDataValidation: boolean;
    needsFutureIntegrations: boolean;
    hasCustomIntegrations: boolean;
    needsHistoricalData: boolean;
    hasComplianceRequirements: boolean;
}

export function determineArchitecture(responses: CoreArchitectureResponses): Architecture {
    if (hasDefinitiveCleanIndicators(responses)) {
        return createCleanArchitectureDecision('High', responses);
    }
    if (hasDefinitiveHexagonalIndicators(responses)) {
        return createHexagonalArchitectureDecision('High', responses);
    }
    const complexityScore = calculateComplexityScore(responses);
    if (complexityScore >= 4) {
        return createCleanArchitectureDecision(
            complexityScore >= 6 ? 'High' : 'Medium', 
            responses
        );
    }
    if (complexityScore <= -4) {
        return createHexagonalArchitectureDecision(
            complexityScore <= -6 ? 'High' : 'Medium',
            responses
        );
    }
    return createNeedsFurtherAnalysisDecision(complexityScore, responses);
}

function calculateComplexityScore(responses: CoreArchitectureResponses): number {
    let score = 0;
    if (responses.hasComplexDomainLogic) score += 3;
    if (responses.hasMultipleSystemSync && responses.hasCustomWorkflows) score += 3;
    if (responses.hasExternalSourceOfTruth && responses.isEventDriven) score -= 3;
    if (responses.hasMultipleSystemSync) score += 2;
    if (responses.needsFutureIntegrations) score += 2;
    if (responses.hasCustomIntegrations) score += 2;
    if (responses.hasComplexDataValidation && responses.needsLocalDataStore) score += 2;
    if (responses.isEventDriven) score -= 2;
    if (responses.hasExternalSourceOfTruth) score -= 2;
    if (!responses.needsLocalDataStore && !responses.needsHistoricalData) score -= 2;
    if (responses.hasCustomWorkflows) score += 1;
    if (responses.needsHistoricalData) score += 1;
    if (responses.hasComplianceRequirements) score += 1;
    return score;
}

function hasDefinitiveCleanIndicators(responses: CoreArchitectureResponses): boolean {
    return (
        (responses.hasComplexDomainLogic && responses.hasMultipleSystemSync) ||
        (responses.hasCustomWorkflows && 
         responses.hasComplexDataValidation && 
         responses.needsLocalDataStore) ||
        (responses.needsFutureIntegrations && responses.hasCustomIntegrations)
    );
}

function hasDefinitiveHexagonalIndicators(responses: CoreArchitectureResponses): boolean {
    return (
        (responses.hasExternalSourceOfTruth && 
         responses.isEventDriven && 
         !responses.needsLocalDataStore) ||
        (!responses.hasComplexDomainLogic && 
         !responses.hasCustomWorkflows && 
         responses.isEventDriven)
    );
}

function getCleanArchitectureReasons(responses: CoreArchitectureResponses): string[] {
    const reasons: string[] = [];
    if (responses.hasComplexDomainLogic) {
        reasons.push('Complex domain logic requires strong separation of concerns');
    }
    if (responses.hasMultipleSystemSync) {
        reasons.push('Multiple system integration benefits from Clean Architecture\'s layered approach');
        if (responses.hasCustomWorkflows) {
            reasons.push('Complex workflows across multiple systems require robust orchestration');
        }
    }
    if (responses.needsLocalDataStore) {
        reasons.push('Significant local data storage needs benefit from Clean Architecture\'s data layer');
        if (responses.hasComplexDataValidation) {
            reasons.push('Complex validation rules with local storage require strong domain model');
        }
    }
    if (responses.needsFutureIntegrations && responses.hasCustomIntegrations) {
        reasons.push('Future integrations with custom endpoints require flexible, extensible architecture');
    }
    return reasons;
}

function getHexagonalArchitectureReasons(responses: CoreArchitectureResponses): string[] {
    const reasons: string[] = [];
    if (responses.hasExternalSourceOfTruth) {
        reasons.push('External systems as source of truth suits ports and adapters pattern');
        if (responses.isEventDriven) {
            reasons.push('Event-driven updates from external systems align well with hexagonal approach');
        }
    }
    if (!responses.needsLocalDataStore) {
        reasons.push('Minimal local storage needs suit Hexagonal Architecture');
        if (!responses.needsHistoricalData) {
            reasons.push('No historical data requirements simplify the architecture');
        }
    }
    if (!responses.hasComplexDomainLogic && !responses.hasCustomWorkflows) {
        reasons.push('Simple domain logic and standard workflows suit Hexagonal Architecture\'s simplicity');
    }
    if (responses.isEventDriven && !responses.hasCustomIntegrations) {
        reasons.push('Standard event-driven integrations work well with ports and adapters');
    }
    return reasons;
}

function createCleanArchitectureDecision(confidence: 'High' | 'Medium', responses: CoreArchitectureResponses): Architecture {
    return {
        architecture: 'Clean Architecture',
        confidence,
        reasons: getCleanArchitectureReasons(responses)
    };
}

function createHexagonalArchitectureDecision(confidence: 'High' | 'Medium', responses: CoreArchitectureResponses): Architecture {
    return {
        architecture: 'Hexagonal Architecture',
        confidence,
        reasons: getHexagonalArchitectureReasons(responses)
    };
}

function createNeedsFurtherAnalysisDecision(score: number, responses: CoreArchitectureResponses): Architecture {
    return {
        architecture: 'Need Further Analysis',
        confidence: 'Low',
        reasons: [
            'System requirements fall between Clean and Hexagonal patterns',
            `Current complexity score: ${score}`,
            'Consider analyzing:',
            '- Expected growth in business logic complexity',
            '- Likelihood of additional system integrations',
            '- Future data management needs'
        ],
        complexityScore: score
    };
} 