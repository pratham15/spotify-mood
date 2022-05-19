import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { tokenAtom } from "../../atoms/tokenAtom";

export default function Player() {
  console.log("Rendered!");
  const [token, setToken] = useAtom(tokenAtom);
  const { player } = window.Spotify;
}
