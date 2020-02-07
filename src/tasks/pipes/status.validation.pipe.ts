import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

@Injectable()
export class StatusValidationPipe implements PipeTransform {

    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    transform(value: any, metadata: ArgumentMetadata) {

        if (this.isNotStatusValid(value)) {
            throw new BadRequestException(`"${value} is an invalid status"`);
        }

        return value;
    }

    private isNotStatusValid(status: any) {
        return this.allowedStatuses.indexOf(status) === -1;
    }
}