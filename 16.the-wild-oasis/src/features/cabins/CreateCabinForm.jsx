
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { useEditCabin } from "./useEditCabin";
import { useCreateCabin } from "./useCreateCabin";

function CreateCabinForm({ cabinDetails = {}, onCloseModal }) {
  const { isEditing, editCabin } = useEditCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const isEditSession = Boolean(cabinDetails.id);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? cabinDetails : {},
  });

  function onSubmit(data) {
    const image =
      typeof data.image === "string" || data.image.length === 0
        ? cabinDetails.image
        : data.image[0];
    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: cabinDetails.id },
        {
          onSuccess: () => {
            onCloseModal();
            reset();
          }
        }
      );
    } else {
      createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            onCloseModal();
            reset();
          }
        }
      );
    }
  }
  function onError(err) {
    console.log(err);
  }

  const isWorking = isEditing || isCreating;

  if (isWorking) return <Spinner />;
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal? "modal": "regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "This field is required!",
          })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required!",
            max: {
              value: 10,
              message: "Maximum number of guests is 10",
            },
            min: {
              value: 1,
              message: "Minimum number of guests is 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required!",
            min: {
              value: 10,
              message: "Minimum price is 10.00$",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required!",
            validate: (value) =>
              value <= getValues("regularPrice") ||
              "Discount should be less than regular price.",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isCreating}
          defaultValue=""
          {...register("description", {
            required: "This field is required!",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required!",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button>{isEditSession ? "Edit cabin" : "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
