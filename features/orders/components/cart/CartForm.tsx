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
import { useState } from "react";

import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

const card = "rounded-2xl border bg-card p-4 sm:p-6";

const field = "h-11 rounded-md pl-10";

const iconInField =
  "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground";

// Optional map preview image.
// Replace undefined with a valid image URL to display a real image.
const MAP_IMAGE_SRC: string | undefined = undefined;

export function CartForm() {
  const [locationUrl, setLocationUrl] = useState("");
  const [locationError, setLocationError] = useState("");
  const [isLocating, setIsLocating] = useState(false);

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
    <section
      aria-labelledby="delivery-title"
      className={`${card} space-y-4`}
    >
      <div className="space-y-1">
        <h2
          id="delivery-title"
          className="text-lg font-semibold"
        >
          Delivery Information
        </h2>

        <p className="text-sm text-muted-foreground">
          Please enter your details to place an order
        </p>
      </div>

      <form id="checkout-form" className="space-y-5">
        {/* Hidden input containing the selected Google Maps URL */}
        <input
          type="hidden"
          name="googleMapsLocation"
          value={locationUrl}
        />

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
                name="customerName"
                placeholder="Enter your full name"
                autoComplete="name"
                className={field}
              />
            </div>
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
                name="customerPhone"
                type="tel"
                placeholder="Enter your phone number"
                autoComplete="tel"
                className={field}
              />
            </div>
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
                name="customerAddress"
                placeholder="Enter your address"
                autoComplete="street-address"
                className={field}
              />
            </div>
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
                {/* Clicking the preview opens Google Maps */}
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

                {/* Remove location */}
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

        {/* Delivery estimate */}
        <p className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
          <Truck
            className="size-4 shrink-0 text-primary"
            aria-hidden="true"
          />

          Estimated delivery: 3-5 business days
        </p>
      </form>
    </section>
  );
}

