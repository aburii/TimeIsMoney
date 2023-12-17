import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { page = 1, pageSize: rawPageSize } = request.query;

    // Set a default limit if not supplied
    const pageSize = rawPageSize
      ? Math.max(1, parseInt(rawPageSize as string, 10))
      : undefined;

    // Add pagination metadata to the request
    request.pagination = {
      page: Math.max(1, parseInt(page as string, 10) || 1),
      pageSize,
    };

    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          const page = request.pagination.page;
          const pageSize = request.pagination.pageSize || data.length;
          const start = (page - 1) * pageSize;
          const end = start + pageSize;
          return {
            maxPages: Math.ceil(data.length / pageSize),
            page: page,
            pageSize: pageSize || data.length,
            pages: data.slice(start, end),
          };
        }
        return data;
      }),
    );
  }
}
