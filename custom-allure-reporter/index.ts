import AllureReporter from 'allure-playwright';
import {Allure}
import { TestCase, TestResult } from "@playwright/test/reporter";

export default class CustomAllureReporter extends AllureReporter {
    // onTestEnd(test: TestCase, result: TestResult) {
    //     super.onTestEnd(test, result);

    //     for (const attachment of result.attachments) {
    //         if (!attachment.body && !attachment.path) {
    //             continue;
    //         }

    //         if (attachment.contentType === 'application/json') {
    //             const [stepName, attachmentName, attachmentOptions] = JSON.parse(attachment.body.toString());
                
    //             // @ts-ignore
    //             const pwStep = Array.from(this.allureStepCache.keys()).find(step => step.title === stepName)

    //             // @ts-ignore
    //             var allureStep = this.allureStepCache.get(pwStep);
              
    //             allureStep.addAttachment()

    //             // this.allureRuntime.createAttachment(attachmentName, attachmentOptions.body, 'image/png')
                
    //             continue;
    //             // allureTest.info.steps.
    //         }

    //         if (attachment.contentType === 'application/json') {
    //             if (!attachment.body) {
    //                 continue;
    //             }
    //             const metadata = JSON.parse(attachment.body.toString());
                
    //             continue;
    //         }



    //         let fileName;
    //         if (attachment.body) {
    //             fileName = runtime.writeAttachment(attachment.body, attachment.contentType);
    //         }
    //         else {
    //             if (!fs_1.default.existsSync(attachment.path)) {
    //                 continue;
    //             }
    //             fileName = runtime.writeAttachmentFromPath(attachment.path, attachment.contentType);
    //         }
    //         allureTest.addAttachment(attachment.name, attachment.contentType, fileName);
    //         if (attachment.name === "diff") {
    //             allureTest.addLabel("testType", "screenshotDiff");
           
    // }
};