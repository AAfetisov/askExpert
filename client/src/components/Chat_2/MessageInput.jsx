/* eslint-disable react/prop-types */
import React from 'react';

export function MessageInput({ socket }) {
//   const handleChange = (() => );

  //   const handleSubmit = (() => )

  return (
    <form>
      <div>
        <input
          type="text"
          name="message"
          placeholder="What do you want to say?"
        //   value={message}
        //   onChange={(handleChange)}
          autoComplete="off"
          required
        />
      </div>

      <div>
        <input
          type="submit"
        // onSubmit={handleSubmit}
          value="Send a message"
        />
      </div>
    </form>
  );
}
