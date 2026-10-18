
"use client";

/* eslint-disable @next/next/no-img-element */

import {
  User,
  Phone,
  MapPin,
  Map,
  Truck,
  ExternalLink,
  Loader2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/ui/card";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema, type OrderFormValues } from "../../validations/orderSchema";
import { useCartStore, selectTotalPrice } from "../../store/CartStore";
import { useMutation } from "@tanstack/react-query";
import { addOrder } from "../../http/AddOrder";
import { useRouter } from "next/navigation";
import { toast } from "sonner";



const field = "h-11 rounded-md pl-10";

const iconInField =
  "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground";


export function CartForm() {

  const router = useRouter();
  const [locationUrl, setLocationUrl] = useState("");
  const [locationError, setLocationError] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const MAP_IMAGE_SRC: string | undefined = locationUrl?"https://res.cloudinary.com/dsnbjtkts/image/upload/v1792223035/289c7dc3-9d5c-400d-b595-086a0bdbb6a0_p2jlww.png":"";

  // ── Cart store ──
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = useCartStore(selectTotalPrice);

  // ── React Hook Form ──
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerAddress: "",
      customerLocationUrl: "",
      totalPrice: 0,
      status: "pending",
      items: [],
    },
  });

  // Sync store data → form hidden fields whenever they change
  useEffect(() => {
    setValue("totalPrice", totalPrice);
  }, [totalPrice, setValue]);

  useEffect(() => {
    const orderItems = items.map((item) => ({
      productId: item.productId,
      variant: item.variant,
      quantity: item.quantity,
    }));
    setValue("items", orderItems);
  }, [items, setValue]);

  useEffect(() => {
    setValue("status", "pending");
  }, [setValue]);

  useEffect(() => {
    setValue("customerLocationUrl", locationUrl);
  }, [locationUrl, setValue]);

  // ── Mutation ──
  const { mutate } = useMutation({
    mutationKey: ["addOrder"],
    mutationFn: addOrder,
    onSuccess: () => {
      toast.success("Order placed successfully"); 
      clearCart();
      router.push("/");
    },
    onError: (err) => {
      const message =
        err instanceof Error ? err.message : "Failed to place order";
      toast.error(message);
    },
  });

  const onSubmit = (data: OrderFormValues) => {
    mutate(data);
  };

  // ── Geolocation handlers ──
  const handleSelectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(
        "Geolocation is not supported by your browser."
      );
      return;
    }

    setLocationError("");
    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const mapsUrl =
          `https://www.google.com/maps/search/?api=1&query=${
            encodeURIComponent(`${latitude},${longitude}`)
          }`;

        setLocationUrl(mapsUrl);
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);

        switch (error.code) {
          case 1:
            setLocationError(
              "Location permission denied. Enable location access in your browser settings."
            );
            break;

          case 2:
            setLocationError(
              "Your location is currently unavailable."
            );
            break;

          case 3:
            setLocationError(
              "Location request timed out. Please try again."
            );
            break;

          default:
            setLocationError(
              "Unable to get your location."
            );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleRemoveLocation = () => {
    setLocationUrl("");
    setLocationError("");
  };

  return (
    <Card aria-labelledby="delivery-title">
      <CardHeader className="space-y-1">
        <CardTitle
          id="delivery-title"
          className="text-lg font-semibold"
        >
          Delivery Information
        </CardTitle>

        <CardDescription>
          Please enter your details to place an order
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="checkout-form"
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="customerName">
                Full Name
              </Label>

              <div className="relative">
                <User
                  className={iconInField}
                  aria-hidden="true"
                />

                <Input
                  id="customerName"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className={field}
                  {...register("customerName")}
                />
              </div>

              {errors.customerName && (
                <p role="alert" className="text-sm text-destructive">
                  {errors.customerName.message}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="customerPhone">
                Phone Number
              </Label>

              <div className="relative">
                <Phone
                  className={iconInField}
                  aria-hidden="true"
                />

                <Input
                  id="customerPhone"
                  type="tel"
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                  className={field}
                  {...register("customerPhone")}
                />
              </div>

              {errors.customerPhone && (
                <p role="alert" className="text-sm text-destructive">
                  {errors.customerPhone.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="customerAddress">
                Address
              </Label>

              <div className="relative">
                <MapPin
                  className={iconInField}
                  aria-hidden="true"
                />

                <Input
                  id="customerAddress"
                  placeholder="Enter your address"
                  autoComplete="street-address"
                  className={field}
                  {...register("customerAddress")}
                />
              </div>

              {errors.customerAddress && (
                <p role="alert" className="text-sm text-destructive">
                  {errors.customerAddress.message}
                </p>
              )}
            </div>

            {/* Google Maps Location */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Map
                  className="size-4"
                  aria-hidden="true"
                />
                Google Maps Location
              </Label>

              {locationUrl ? (
                /* Location selected successfully */
                <div className="relative h-24 overflow-hidden rounded-lg border border-border">
                  <a
                    href={locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open selected location in Google Maps"
                    className="group block size-full"
                  >
                    {MAP_IMAGE_SRC ? (
                      <img
                        src={MAP_IMAGE_SRC}
                        alt="Selected location map preview"
                        className="size-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex size-full flex-col items-center justify-center gap-1 bg-muted/50 transition-colors hover:bg-muted">
                        <MapPin
                          className="size-7 text-primary"
                          aria-hidden="true"
                        />

                        <span className="text-xs font-medium text-foreground">
                          View selected location on Google Maps
                        </span>
                      </div>
                    )}

                    {/* Open map indicator */}
                    <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-background/95 px-2 py-1 text-xs font-medium text-foreground shadow-sm">
                      <ExternalLink
                        className="size-3"
                        aria-hidden="true"
                      />
                      Open map
                    </span>
                  </a>

                  {/* Remove selected location */}
                  <button
                    type="button"
                    onClick={handleRemoveLocation}
                    aria-label="Remove selected location"
                    title="Remove location"
                    className="absolute right-2 top-2 z-10 flex size-7 cursor-pointer items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-sm transition-colors hover:bg-destructive hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <X
                      className="size-4"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              ) : (
                /* No location selected */
                <button
                  type="button"
                  onClick={handleSelectLocation}
                  disabled={isLocating}
                  aria-label="Select your current location"
                  className="relative flex h-24 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/50 transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-wait"
                >
                  {isLocating ? (
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2
                        className="size-4 animate-spin"
                        aria-hidden="true"
                      />
                      Getting your location...
                    </span>
                  ) : MAP_IMAGE_SRC ? (
                    <img
                      src={MAP_IMAGE_SRC}
                      alt=""
                      className="size-full object-cover"
                    />
                  ) : (
                    <MapPin
                      className="size-7 text-primary"
                      aria-hidden="true"
                    />
                  )}
                </button>
              )}

              {/* Location error */}
              {locationError && (
                <p
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {locationError}
                </p>
              )}

              {/* Helper text */}
              {!locationUrl && !isLocating && !locationError && (
                <p className="text-xs text-muted-foreground">
                  Tap to share your current location.
                </p>
              )}
            </div>
          </div>

          {/* Items validation error */}
          {errors.items && (
            <p role="alert" className="text-sm text-destructive">
              {errors.items.message}
            </p>
          )}

          {/* Delivery estimate */}
          <p className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
            <Truck
              className="size-4 shrink-0 text-black"
              aria-hidden="true"
            />
            Estimated delivery: 3-5 business days
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
