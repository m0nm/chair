import { PageHeader } from "@/app/_components/page-header";
import { Label } from "@/app/_components/ui/label";
import { Skeleton } from "@/app/_components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <PageHeader header="Edit Coupon" />
      <div className="mt-8">
        <div className="mb-6">
          <h5 className="text-lg font-medium">Coupon Name</h5>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter a unique name for your coupon that will be used by users.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-1.5">
          <Label htmlFor="name">Name:</Label>
          <Skeleton className="h-9 w-full max-w-lg" />
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-6">
          <h5 className="text-lg font-medium">Coupon Details</h5>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter the value and type (fixed or percent) of your coupon.
          </p>
        </div>

        <div className="grid grid-cols-9 gap-10">
          <div className="col-span-9 flex flex-col gap-1.5 lg:col-span-3">
            <Label htmlFor="coupon-value">Value</Label>
            <Skeleton className="h-9 w-full" />
          </div>

          <div className="col-span-9 flex flex-col gap-1.5 lg:col-span-3">
            <Label htmlFor="coupon-type" className="col-span-2">
              Type
            </Label>
            <Skeleton className="h-9 w-full" />
          </div>

          <div className="col-span-9 flex flex-col gap-1.5 lg:col-span-3">
            <Label htmlFor="coupon-status" className="col-span-2">
              Status
            </Label>
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="mb-6">
          <h5 className="text-lg font-medium">Coupon Date Range</h5>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter the starting date and the expiration date of the coupon.
          </p>
        </div>

        <div className="grid grid-cols-9 justify-start gap-10">
          <div className="col-span-9 flex flex-col gap-1.5 lg:col-span-3">
            <Label htmlFor="coupon-start">Starting Date</Label>
            <Skeleton className="h-9 w-full" />
          </div>

          <div className="col-span-9 flex flex-col gap-1.5 lg:col-span-3">
            <Label htmlFor="coupon-start">Expiration Date</Label>
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
