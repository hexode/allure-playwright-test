import AllureReporter from 'allure-playwright';

import {AllureStep, AllureRuntime} from 'allure-js-commons';
import {TestCase, TestResult, TestStep } from '@playwright/test/reporter';

declare module 'allure-playwright' {
    export default interface AllureReporter {
        onStepEnd(test: TestCase, result: TestResult, step: TestStep): void;
        onTestEnd(test: TestCase, result: TestResult): void;
        allureStepCache: Map<TestStep, AllureStep>
        getAllureRuntime: () => AllureRuntime
    }
}


export default class CustomAllureReporter extends AllureReporter {
    onTestEnd(test: TestCase, result: TestResult) {
        

        const runtime = this.getAllureRuntime();

        for (const attachment of result.attachments) {
            if (attachment.name.startsWith('e2e-step-metadata')) {
                const [_, stepName, attachmentName] = attachment.name.split('{{SEP}}');

                const {body: content, contentType} = attachment;

                const pwStep = Array.from(this.allureStepCache.keys()).find(step => step.title === stepName);
                const allureStep = this.allureStepCache.get(pwStep);
                const filename = runtime.writeAttachment(content, contentType);

                allureStep.addAttachment(attachmentName, contentType, filename);
            }
        }

        result.attachments = result.attachments.filter((attachment) => !attachment.name.startsWith('e2e-step-metadata'))

        super.onTestEnd(test, result);
    }
};


