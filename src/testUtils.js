import { act } from "react-dom/test-utils";
import _flushPromises from 'flush-promises';

export const flushPromises = async () => {
  await act(async () => {
    await _flushPromises()
  })
}
